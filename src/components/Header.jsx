import { useState } from "react";
import { Search } from "lucide-react";

export const Header = ({ setLocationWeather }) => {
  const [value, setValue] = useState("");

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">forecazt</h1>
      <div className="flex justify-end w-1/2">
        <input
          type="text"
          placeholder="Search for places"
          className="w-full mr-2 border border-gray-300 rounded-md p-2 text-xs align-middle"
          onChange={handleOnChange}
          value={value}
        />
        <button
          className="text-gray-600 align-middle"
          onClick={() => setLocationWeather(value)}>
          <Search size={25} />
        </button>
      </div>
    </div>
  );
};
