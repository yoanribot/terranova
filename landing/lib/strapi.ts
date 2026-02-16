import { BlogData as BlogData, HomepageData, Metadata } from "@/types/data";
import qs from "qs";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "http://localhost:1337";

const METADATA = {
  populate: {
    sections: {
      on: {
        "layout.socials": {
          populate: {
            socials: { populate: true },
          },
        },
      },
    },
  },
};

const QUERY_BLOGS = {
  filters: {
    slug: {
      $eq: "implantes-dentales",
    },
  },
  populate: {
    images: { fields: ["url", "alternativeText"] },
    backgroundImage: { fields: ["url", "alternativeText"] },
  },
};

const QUERY_BLOG_BY_SLUG = (slug: string) => ({
  filters: {
    slug: {
      $eq: slug,
    },
  },
  populate: {
    images: { fields: ["url", "alternativeText"] },
    backgroundImage: { fields: ["url", "alternativeText"] },
  },
});

const QUERY_HOME_PAGE = {
  populate: {
    sections: {
      on: {
        "layout.hero-section": {
          populate: {
            image: { fields: ["url", "alternativeText"] },
            link: { populate: true },
          },
        },
        "layout.about-us": {
          populate: {
            image: { fields: ["url", "alternativeText"] },
          },
        },
        "layout.services": {
          populate: {
            services: {
              populate: {
                image: { fields: ["url", "alternativeText"] },
              },
            },
          },
        },
        "layout.team": {
          populate: {
            members: {
              populate: {
                tags: { fields: ["text"] },
                image: { fields: ["url", "alternativeText"] },
              },
            },
          },
        },
        "layout.location": {
          populate: {
            schedules: { populate: true },
            location: { populate: true },
          },
        },
      },
    },
  },
};

export async function getMetadata(): Promise<Metadata> {
  const query = qs.stringify(METADATA);

  const response = await getStrapiData(`/api/home-page?${query}`);

  return response?.data;
}

export async function getHomepage(): Promise<HomepageData> {
  const query = qs.stringify(QUERY_HOME_PAGE);

  const response = await getStrapiData(`/api/home-page?${query}`);

  return response?.data;
}

export async function getBlogs(): Promise<BlogData[]> {
  const query = qs.stringify(QUERY_BLOGS);

  const response = await getStrapiData(`/api/blogs?${query}`);

  return response?.data;
}

export async function getBlogBySlug(slug: string): Promise<BlogData[]> {
  const query = qs.stringify(QUERY_BLOG_BY_SLUG(slug));

  const response = await getStrapiData(`/api/blogs?${query}`);

  return response?.data;
}

export const getStrapiData = async (url: string) => {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}${url}`);

    if (!response) {
      throw new Error("Failed to fetch data from Strapi");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
    return null;
  }
};
