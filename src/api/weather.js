const API_KEY = import.meta.env.VITE_API_KEY;
const API_HOST = import.meta.env.VITE_API_HOST;

export const getLocationData = async (city) => {
  const response = await fetch(
    `${API_HOST}/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
  );
  return await response.json();
};

export const getWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(
      `${API_HOST}/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Weather API Error: ${error.message}`);
  } finally {
    console.log("finally");
  }
};
