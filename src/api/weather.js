const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/3.0';
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
  try {
    const response = await fetch(
      `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Weather API Error: ${error.message}`);
  }
};
