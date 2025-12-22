export const API_BASE_URL = "http://localhost:1337";
const HOMEPAGE_BASE_URL = `${API_BASE_URL}/api/home-page`;
export const HERO_BANNER_DATA_PATH = `${HOMEPAGE_BASE_URL}?populate[sections][on][layout.hero-section][populate][image][fields][0]&populate[sections][on][layout.hero-section][populate][link][populate]`;
