const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const mediaDirectory = path.join(root, "public", "content", "media");
const contentPath = path.join(root, "content", "site.json");
const convertibleExtensions = new Set([".jpg", ".jpeg", ".png"]);

function replaceMediaUrls(value, replacements) {
  if (typeof value === "string") return replacements.get(value) || value;
  if (Array.isArray(value)) return value.map((item) => replaceMediaUrls(item, replacements));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, replaceMediaUrls(item, replacements)]),
    );
  }
  return value;
}

async function main() {
  const files = (await fs.readdir(mediaDirectory)).filter((file) =>
    convertibleExtensions.has(path.extname(file).toLowerCase()),
  );
  const replacements = new Map();
  let sourceBytes = 0;
  let outputBytes = 0;

  for (const file of files) {
    const sourcePath = path.join(mediaDirectory, file);
    const destinationName = `${path.basename(file, path.extname(file))}.webp`;
    const destinationPath = path.join(mediaDirectory, destinationName);
    const source = await fs.stat(sourcePath);

    await sharp(sourcePath)
      .rotate()
      .webp({ quality: 82, effort: 6, smartSubsample: true })
      .toFile(destinationPath);

    const output = await fs.stat(destinationPath);
    sourceBytes += source.size;
    outputBytes += output.size;
    replacements.set(`/content/media/${file}`, `/content/media/${destinationName}`);
  }

  const content = JSON.parse(await fs.readFile(contentPath, "utf8"));
  await fs.writeFile(
    contentPath,
    `${JSON.stringify(replaceMediaUrls(content, replacements), null, 2)}\n`,
  );

  await Promise.all(files.map((file) => fs.unlink(path.join(mediaDirectory, file))));
  const savedBytes = sourceBytes - outputBytes;
  console.log(
    `Converted ${files.length} images to WebP: ${(sourceBytes / 1024 / 1024).toFixed(2)} MB → ${(outputBytes / 1024 / 1024).toFixed(2)} MB (${(savedBytes / 1024 / 1024).toFixed(2)} MB saved).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
