import axios from "axios";

// Your RapidAPI key (as provided). If you change it, update here.
const RAPIDAPI_KEY = "861b0c7fc8mshcc1eadf555ee502p16471cjsnd7a532895e2d";
const RAPIDAPI_HOST = "travel-advisor.p.rapidapi.com";

export const rapidApiClient = axios.create({
  baseURL: "https://travel-advisor.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": RAPIDAPI_KEY,
    "X-RapidAPI-Host": RAPIDAPI_HOST
  },
});

// Helper to search locations
export async function searchLocations(query = "Paris") {
  const { data } = await rapidApiClient.get("/locations/search", {
    params: { query, limit: "24" }
  });
  // travel-advisor responses vary; return safe fallback
  return data?.data || data?.suggestions || data?.results || data || [];
}
