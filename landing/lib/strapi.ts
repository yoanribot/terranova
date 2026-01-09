import { HomepageData, Metadata } from "@/types/data";
import qs from "qs";

const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL || "http://localhost:1337";

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

  console.log({ response });

  return response?.data;
}

export async function getHomepage(): Promise<HomepageData> {
  const query = qs.stringify(QUERY_HOME_PAGE);

  const response = await getStrapiData(`/api/home-page?${query}`);

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
