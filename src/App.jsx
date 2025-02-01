import { useEffect } from "react";
import { Header } from "./components/Header";
import { CurrentWeather } from "./components/CurrentWeather";
import { HourlyForecast } from "./components/HourlyForecast";
import { useWeather } from "./hooks/useWeather";

function App() {
  const {
    weatherData,
    isLoading,
    error,
    getCurrentLocationWeather,
    setLocationWeather,
  } = useWeather();

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md w-full mx-auto space-y-4">
        <Header setLocationWeather={setLocationWeather} />
        <CurrentWeather weatherData={weatherData} />
        <HourlyForecast weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
