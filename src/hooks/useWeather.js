import { useState } from 'react';
import { getLocationData, getWeatherData } from '../api/weather';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWeatherData = async (city) => {
    try {
      const [locationData] = await getLocationData(city);
      const weather = await getWeatherData(
        locationData.lat,
        locationData.lon
      );
      setWeatherData(weather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    weatherData,
    isLoading,
    fetchWeatherData
  };
};