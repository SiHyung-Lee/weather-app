import { useEffect, useState } from "react";
import { getLocationData, getWeatherData } from "./api/weather";
import { Header } from "./components/Header";
import { CurrentWeather } from "./components/CurrentWeather";
import { HourlyForecast } from "./components/HourlyForecast";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const useWeatherData = async (city) => {
    try {
      const [locationData] = await getLocationData(city);
      const weatherData = await getWeatherData(
        locationData.lat,
        locationData.lon
      );
      setWeatherData(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const init = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const weatherData = await getWeatherData(latitude, longitude);
      setWeatherData(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      ) : (
        <div className="min-h-screen p-4">
          <div className="max-w-md w-full space-y-4">
            <Header />
            <CurrentWeather weatherData={weatherData} />
            <HourlyForecast weatherData={weatherData} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
