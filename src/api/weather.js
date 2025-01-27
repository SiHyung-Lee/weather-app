const API_KEY = import.meta.env.VITE_API_KEY;
const API_HOST = import.meta.env.VITE_API_HOST;
const API_ENDPOINTS = {
  GEO: "/geo/1.0/direct",
  WEATHER: "/data/3.0/onecall",
};

export const getLocationData = async (city) => {
  const response = await fetch(
    `${API_HOST}${API_ENDPOINTS.GEO}?q=${city}&limit=5&appid=${API_KEY}`,
  );
  return response.json();
};

export const getWeatherData = async (lat, lon) => {
  const response = await fetch(
    `${API_HOST}${API_ENDPOINTS.WEATHER}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );
  return response.json();
};
