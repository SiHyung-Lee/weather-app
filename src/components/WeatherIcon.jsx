import {
  Sun,
  Cloud,
  Cloudy,
  CloudSun,
  CloudSunRain,
  CloudRain,
  CloudLightning,
  CloudSnow,
} from "lucide-react";

export const renderWeatherIcon = (iconCode, size = 30) => {
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
};
