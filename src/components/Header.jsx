import { Search } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">forecazt</h1>
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search for places"
          className="w-full mr-2 border border-gray-300 rounded-md p-2 text-xs align-middle"
        />
        <button className="text-gray-600 align-middle">
          <Search size={25} />
        </button>
      </div>
    </div>
  );
};
