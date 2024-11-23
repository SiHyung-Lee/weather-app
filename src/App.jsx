import { useEffect, useState } from "react";

function App() {
  const API_KEY = "1c6040609dd62a847ede395d2b820d43";
  const city = "Seoul";
  const [datas, setDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async function () {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      );
      const result = await response.json();
      setDatas(result);
      setIsLoading(false);
    })();
  }, []);
  if (!isLoading) {
    console.log(datas);
  }
  return <></>;
}

export default App;
