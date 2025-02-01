import { Ellipsis } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">forecazt</h1>
      <button className="text-gray-600">
        <Ellipsis size={25} />
      </button>
    </div>
  );
};
