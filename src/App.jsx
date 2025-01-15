import { useEffect, useState } from "react";
import {
  Ellipsis,
  Sun,
  Cloud,
  Cloudy,
  CloudSun,
  CloudSunRain,
  CloudRain,
  CloudLightning,
  CloudSnow,
} from "lucide-react";

const API_KEY = "1c6040609dd62a847ede395d2b820d43";
const API_HOST = "http://api.openweathermap.org";
const API_ENDPOINTS = {
  geo: "/geo/1.0/direct",
  weather: "/data/3.0/onecall",
};

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const options = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const dateString = date.toLocaleString("en-US", options).replace(/,/g, "");
  const [month, day, year, time, meridian] = dateString.split(" "); // 공백으로 분리
  return (
    <>
      {month} {day} {year} <span className="mx-0.5">|</span> {time}
      {meridian}
    </>
  );
}

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const options = {
    hour: "numeric",
    hour12: true,
  };
  const dateString = date.toLocaleString("en-US", options).replace(/,/g, "");
  const [time, meridian] = dateString.split(" "); // 공백으로 분리
  return (
    <>
      {time}
      {meridian.toLowerCase()}
    </>
  );
}

function renderWeatherIcon(iconCode, size = 30) {
  const iconMapping = {
    "01d": <Sun size={size} />,
    "02d": <CloudSun size={size} />,
    "03d": <Cloud size={size} />,
    "04d": <Cloudy size={size} />,
    "09d": <CloudRain size={size} />,
    "10d": <CloudSunRain size={size} />,
    "11d": <CloudLightning size={size} />,
    "13d": <CloudSnow size={size} />,
    "50d": <CloudSun size={size} />,
    "01n": <Sun size={size} />,
    "02n": <CloudSun size={size} />,
    "03n": <Cloud size={size} />,
    "04n": <Cloudy size={size} />,
    "09n": <CloudRain size={size} />,
    "10n": <CloudSunRain size={size} />,
    "11n": <CloudLightning size={size} />,
    "13n": <CloudSnow size={size} />,
    "50n": <CloudSun size={size} />,
  };
  return iconMapping[iconCode];
}

function App() {
  const [city, setCity] = useState("london");
  // const [coord, setCoord] = useState({ lat: 37.566535, lon: 126.9779692 }); // seoul
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLocationData = async (city) => {
    const response = await fetch(
      `${API_HOST}${API_ENDPOINTS.geo}?q=${city}&limit=5&appid=${API_KEY}`,
    );
    return response.json();
  };

  const fetchWeatherData = async (lat, lon) => {
    const response = await fetch(
      `${API_HOST}${API_ENDPOINTS.weather}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );
    return response.json();
  };

  const loadWeatherData = async () => {
    try {
      const [locationData] = await fetchLocationData(city);
      // setCoord(locationData);

      const weatherData = await fetchWeatherData(
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

  useEffect(() => {
    loadWeatherData();
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
