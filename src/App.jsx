import { useEffect } from "react";
import { Header } from "./components/Header";
import { CurrentWeather } from "./components/CurrentWeather";
import { HourlyForecast } from "./components/HourlyForecast";
import { useWeather } from "./hooks/useWeather";

function App() {
  const { weatherData, isLoading, fetchWeatherData } = useWeather();

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
