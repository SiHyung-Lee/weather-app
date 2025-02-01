import PropTypes from "prop-types";
import { formatDate } from "../utils/dateFormatter";
import { renderWeatherIcon } from "./weatherIcon";

export const CurrentWeather = ({ weatherData }) => {
  return (
    <div className="bg-yellow-400 rounded-3xl px-6 py-7 text-white">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">{weatherData.timezone}</h2>
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
        <p className="text-sm">{weatherData.current.weather[0].description}</p>
      </div>
    </div>
  );
};

CurrentWeather.propTypes = {
  weatherData: PropTypes.shape({
    timezone: PropTypes.string.isRequired,
    current: PropTypes.shape({
      dt: PropTypes.number.isRequired,
      temp: PropTypes.number.isRequired,
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string.isRequired,
          main: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};
