import { useEffect, useState } from "react";
import {
  Ellipsis,
  Sun,
  Cloud,
  CloudSun,
  Wind,
  Sunrise,
  Thermometer,
} from "lucide-react";

function App() {
  const API_KEY = "1c6040609dd62a847ede395d2b820d43";
  const [coord, setCoord] = useState({ lat: 51.5072, lon: -0.1275 });
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}&units=metric`,
        );
        const result = await response.json();
        setWeatherData(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
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
            {/* App Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">forecazt</h1>
              <button className="text-gray-600">
                <Ellipsis size={25} />
              </button>
            </div>

            {/* Main Weather Card */}
            <div className="bg-yellow-400 rounded-3xl px-6 py-8 text-white">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold">
                  {weatherData.timezone}
                </h2>
                <p className="text-xs opacity-90">
                  Today, May 17 2024 | {weatherData.current.dt}
                </p>
              </div>

              <div className="flex flex-col items-center mt-5">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                  className="mb-8"
                />
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

            {/* Hourly Forecast */}
            <div className="flex justify-between mt-4 px-2.5">
              {weatherData.hourly.map((time, index) => {
                return (
                  <div key={index} className="flex flex-col items-center">
                    <span className="flex items-center justify-center w-14 h-14 mb-3 rounded-full bg-gray-100">
                      <img
                        src={`https://openweathermap.org/img/wn/${time.weather[0].icon}@2x.png`}
                        className="text-gray-600"
                      />
                    </span>
                    <span className="mb-1 text-xs text-gray-600 font-bold">
                      {time.dt}
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
