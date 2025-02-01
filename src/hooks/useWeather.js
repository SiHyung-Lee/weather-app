import { useState } from "react";
import { getLocationData, getWeatherData } from "../api/weather";

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCurrentLocationWeather = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const data = await getWeatherData(latitude, longitude);
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLocationWeather = async (location) => {
    const locationData = await getLocationData(location);
    const { lat, lon } = locationData[0];
    const data = await getWeatherData(lat, lon);
    setWeatherData(data);
  };

  const fetchWeatherByLocation = async (lat, lon) => {
    try {
      setIsLoading(true);
      const data = await getWeatherData(lat, lon);
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    setLocationWeather,
    weatherData,
    isLoading,
    error,
    getCurrentLocationWeather,
    fetchWeatherByLocation,
  };
};
