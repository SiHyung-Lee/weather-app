export const formatDate = (timestamp) => {
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
};

export const formatTime = (timestamp) => {
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
};
