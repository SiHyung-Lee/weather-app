import { useEffect, useState } from "react";
import { Sun, Wind, Sunrise, Thermometer } from "lucide-react";

function App() {
  const API_KEY = "1c6040609dd62a847ede395d2b820d43";
  const [coord, setCoord] = useState({ lat: 37.5665, lon: 126.978 });
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
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      ) : (
        <>
          <div className="min-h-screen ">
            <header className=" p-6 md:p-8">
              <div className="text-center">{weatherData.timezone}</div>
              <div className="flex flex-col items-center justify-between mt-8">
                <div className="flex items-center gap-4">
                  {weatherData.current.weather[0].icon && (
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                      alt={weatherData.current.weather[0].description}
                      className="w-32 h-32 md:w-24 md:h-24"
                    />
                  )}
                </div>
                <div className="text-7xl md:text-8xl font-bold mb-8">
                  {Math.round(weatherData.current.temp)}°
                </div>
                <p className="text-xl md:text-2xl capitalize">
                  {weatherData.current.weather[0].description}
                </p>
              </div>
            </header>
          </div>
        </>
      )}
    </>
  );
}

export default App;
