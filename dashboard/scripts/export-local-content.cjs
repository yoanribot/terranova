/*
 * One-way Strapi snapshot exporter for the sibling Next.js landing project.
 * It intentionally exports only published entries and resolves every media
 * relation to a public, local path.
 */
const fs = require("node:fs/promises");
const path = require("node:path");
const Database = require("better-sqlite3");

const dashboardRoot = path.resolve(__dirname, "..");
const landingRoot = path.resolve(dashboardRoot, "..", "landing");
const databasePath = path.join(dashboardRoot, ".tmp", "data.db");
const outputDirectory = path.join(landingRoot, "content");
const mediaDirectory = path.join(landingRoot, "public", "content", "media");

function loadEnvironment(filePath) {
  return Object.fromEntries(
    require("node:fs")
      .readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .flatMap((line) => {
        const match = line.match(/^\s*([^#=\s]+)=(.*)$/);
        return match ? [[match[1], match[2].trim().replace(/^['"]|['"]$/g, "")]] : [];
      }),
  );
}

function json(value) {
  return value ? JSON.parse(value) : [];
}

async function main() {
  const env = loadEnvironment(path.join(landingRoot, ".env"));
  const baseUrl = env.NEXT_PUBLIC_STRAPI_BASE_URL?.replace(/\/$/, "");
  if (!baseUrl) throw new Error("NEXT_PUBLIC_STRAPI_BASE_URL is required in landing/.env");

  const db = new Database(databasePath, { readonly: true });
  const all = (sql, ...params) => db.prepare(sql).all(...params);
  const one = (sql, ...params) => db.prepare(sql).get(...params);
  const fileRows = all("SELECT id, name, alternative_text, mime, url FROM files WHERE published_at IS NOT NULL");
  const files = new Map(
    fileRows.map((file) => [
      file.id,
      {
        url: `/content/media/${path.basename(file.url)}`,
        alternativeText: file.alternative_text || file.name,
        sourceUrl: file.url,
      },
    ]),
  );
  const mediaFor = (relatedType, relatedId, field) => {
    const relations = all(
      "SELECT file_id FROM files_related_mph WHERE related_type = ? AND related_id = ? AND field = ? ORDER BY [order]",
      relatedType,
      relatedId,
      field,
    );
    return relations.map(({ file_id: id }) => files.get(id)).filter(Boolean);
  };
  const mediaOne = (type, id, field) => mediaFor(type, id, field)[0];
  const component = (table, id) => one(`SELECT * FROM [${table}] WHERE id = ?`, id);

  const home = one("SELECT * FROM home_pages WHERE published_at IS NOT NULL LIMIT 1");
  if (!home) throw new Error("No published home page was found in the local Strapi snapshot");
  const hero = component("components_layout_hero_sections", 3);
  const heroLinkId = one("SELECT cmp_id FROM components_layout_hero_sections_cmps WHERE entity_id = 3 AND field = 'link'")?.cmp_id;
  const about = component("components_layout_about_uses", 3);
  const serviceSection = component("components_layout_services", 3);
  const serviceLinks = all(
    "SELECT cmp_id FROM components_layout_services_cmps WHERE entity_id = 3 AND field = 'services' ORDER BY [order]",
  );
  const services = serviceLinks.map(({ cmp_id: id }) => {
    const card = component("components_component_cards", id);
    return { ...card, image: mediaOne("component.card", id, "image") };
  });
  const location = component("components_layout_locations", 3);
  const locationId = one("SELECT cmp_id FROM components_layout_locations_cmps WHERE entity_id = 3 AND field = 'location'")?.cmp_id;
  const schedules = all(
    "SELECT c.day, c.availability FROM components_layout_locations_cmps l JOIN components_component_schedules c ON c.id = l.cmp_id WHERE l.entity_id = 3 AND l.field = 'schedules' ORDER BY l.[order]",
  );
  const socialLinks = all(
    "SELECT c.href, c.label, c.is_external AS isExternal FROM components_layout_socials_cmps l JOIN components_component_links c ON c.id = l.cmp_id WHERE l.entity_id = 3 AND l.field = 'socials' ORDER BY l.[order]",
  );
  const blogRows = all("SELECT * FROM blogs WHERE published_at IS NOT NULL ORDER BY id");
  const blogs = blogRows.map((blog) => ({
    slug: blog.slug,
    title: blog.title,
    content: json(blog.content),
    backgroundImage: mediaOne("api::blog.blog", blog.id, "backgroundImage"),
    images: mediaFor("api::blog.blog", blog.id, "images"),
  }));
  const site = {
    exportedAt: new Date().toISOString(),
    home: {
      title: home.title,
      description: home.description,
      sections: [
        {
          __component: "layout.hero-section",
          heading: hero.heading,
          subHeading: hero.sub_heading,
          text: hero.text,
          link: heroLinkId ? component("components_component_links", heroLinkId) : null,
          image: mediaOne("layout.hero-section", hero.id, "image"),
        },
        {
          __component: "layout.about-us",
          title: about.title,
          text: json(about.text),
          image: mediaOne("layout.about-us", about.id, "image"),
        },
        { __component: "layout.services", title: serviceSection.title, services },
        {
          __component: "layout.location",
          title: location.title,
          description: location.description,
          phoneMain: location.phone_main,
          phoneSecondary: location.phone_secondary,
          email: location.email,
          address: location.address,
          location: locationId ? component("components_component_locations", locationId) : null,
          schedules,
        },
        { __component: "layout.socials", socials: socialLinks },
      ],
    },
    blogs,
  };

  await fs.mkdir(outputDirectory, { recursive: true });
  await fs.mkdir(mediaDirectory, { recursive: true });
  await Promise.all(
    fileRows.map(async (file) => {
      const response = await fetch(`${baseUrl}${file.url}`);
      if (!response.ok) throw new Error(`Unable to download ${file.url}: ${response.status}`);
      await fs.writeFile(path.join(mediaDirectory, path.basename(file.url)), Buffer.from(await response.arrayBuffer()));
    }),
  );
  await fs.writeFile(path.join(outputDirectory, "site.json"), `${JSON.stringify(site, null, 2)}\n`);
  console.log(`Exported ${blogs.length} published pages, ${services.length} services, and ${fileRows.length} media files.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
