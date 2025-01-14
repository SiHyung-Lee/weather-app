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
  const [coord, setCoord] = useState({ lat: 37.5665, lon: 126.978 });
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const initWeatherData = [
    { time: "Now", temp: 32, icon: Sun },
    { time: "4pm", temp: 30, icon: Sun },
    { time: "5pm", temp: 28, icon: CloudSun },
    { time: "6pm", temp: 26, icon: Cloud },
    { time: "7pm", temp: 26, icon: Cloud },
  ];

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
                <h2 className="text-sm font-semibold">Central Jakarta</h2>
                <p className="text-xs opacity-90">
                  Today, May 17 2024 | 03:24PM
                </p>
              </div>

              <div className="flex flex-col items-center mt-5">
                <Sun size={230} strokeWidth={1.5} className="mb-8" />
                <span className="text-6xl font-bold mb-3">32°</span>
                <span className="text-2xl mb-2">Sunny</span>
                <p className="text-sm">Sunblock is needed for you!</p>
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="flex justify-between mt-4 px-2.5">
              {initWeatherData.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex flex-col items-center">
                    <span className="flex items-center justify-center w-14 h-14 mb-3 rounded-full bg-gray-100">
                      <Icon size={24} className="text-gray-600" />
                    </span>
                    <span className="mb-1 text-xs text-gray-600 font-bold">
                      {item.time}
                    </span>
                    <span className="text-xs">{item.temp}°</span>
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
