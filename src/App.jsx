import { useEffect, useState } from "react";

function App() {
  const API_KEY = "1c6040609dd62a847ede395d2b820d43";
  const city = "Edinburgh";
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async function () {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      );
      const result = await response.json();
      setData(result);
      setIsLoading(false);
    })();
  }, []);
  if (!isLoading) {
    console.log(data);
  }
  return (
    <>
      <div className="location">
        {data.name}, {data.sys.country}
      </div>
      <div className="current-weather">
        <span className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
          />
        </span>
        <span className="temperature">19°</span>

        <span className="description">data.weather[0].main</span>
      </div>
      <div className="weekly-forecast">
        <ul>
          <li className="forecast-item">
            <span className="forecast-date">Wed Jun 21</span>
            <span className="forecast-temp">29° 13°C</span>
          </li>
          <li className="forecast-item">
            <span className="forecast-date">Thu Jun 22</span>
            <span className="forecast-temp">26° 10°C</span>
          </li>
          <li className="forecast-item">
            <span className="forecast-date">Fri Jun 23</span>
            <span className="forecast-temp">26° 12°C</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
