import { formatTime } from "../utils/dateFormatter";
import { renderWeatherIcon } from "./weatherIcon";

export const HourlyForecast = ({ weatherData }) => {
  return (
    <div className="flex justify-between mt-4 px-2.5">
      {weatherData.hourly.slice(0, 5).map((time, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center">
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
  );
};
