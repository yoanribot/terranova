import { HomepageData } from "@/types/data";
import qs from "qs";

const BASE_STRAPI_URL = "http://localhost:1337";

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
      },
    },
  },
};

export async function getHomepage(): Promise<HomepageData> {
  const query = qs.stringify(QUERY_HOME_PAGE);

  const response = await getStrapiData(`/api/home-page?${query}`);

  return response?.data;
}

export const getStrapiData = async (url: string) => {
  try {
    console.log("getStrapiData .....", `${BASE_STRAPI_URL}${url}`);
    const response = await fetch(`${BASE_STRAPI_URL}${url}`);

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
