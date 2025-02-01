import { useState } from 'react';
import { getWeatherData } from '../api/weather';

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
    weatherData,
    isLoading,
    error,
    getCurrentLocationWeather,
    fetchWeatherByLocation,
  };
};