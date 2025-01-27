import { useEffect, useState } from "react";
import { getLocationData, getWeatherData } from "./api/weather";
import { formatDate, formatTime } from "./utils/dateFormatter";
import { renderWeatherIcon } from "./components/weatherIcon";
import { Ellipsis } from "lucide-react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const useWeatherData = async (city) => {
    try {
      const [locationData] = await getLocationData(city);
      const weatherData = await getWeatherData(
        locationData.lat,
        locationData.lon,
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
        <div className="flex items-center justify-center min-h-screen ">
          <div className="text-xl">Loading...</div>
        </div>
      ) : (
        <div className="min-h-screen p-4">
          <div className="max-w-md w-full space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">forecazt</h1>
              <button className="text-gray-600">
                <Ellipsis size={25} />
              </button>
            </div>
            <div className="bg-yellow-400 rounded-3xl px-6 py-7 text-white">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold">
                  {weatherData.timezone}
                </h2>
                <p className="text-xs opacity-90">
                  Today. {formatDate(weatherData.current.dt)}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <span className="w-full flex justify-center mt-5 mb-8">
                  {renderWeatherIcon(weatherData.current.weather[0].icon, 200)}
                </span>
                <span className="text-6xl font-bold mb-3">
                  {weatherData.current.temp}°
                </span>
                <span className="text-2xl mb-2">
                  {weatherData.current.weather[0].main}
                </span>
                <p className="text-sm">
                  {weatherData.current.weather[0].description}
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-4 px-2.5">
              {weatherData.hourly.slice(0, 5).map((time, index) => {
                return (
                  <div key={index} className="flex flex-col items-center">
                    <span className="flex items-center justify-center w-14 h-14 mb-3 rounded-full bg-gray-100">
                      {renderWeatherIcon(time.weather[0].icon)}
                    </span>
                    <span className="mb-1 text-xs text-gray-600 font-bold">
                      {index === 0 ? "Now" : formatTime(time.dt)}
                    </span>
                    <span className="text-xs">{time.temp}°</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
