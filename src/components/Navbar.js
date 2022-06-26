import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="mb-4 bg-transparent min-h-10 py-3 px-10 w-screen flex flex-1 justify-evenly items-center">
      <Link to="/">
        <span className="border-2 border-fuchsia-500 rounded-md mx-4 bg-indigo-200 bg-opacity-25 text-teal-900  px-5 py-2 hover:bg-fuchsia-400 hover:text-white">
          HOME
        </span>
      </Link>
      <Link to="/idealweight">
        <span className="border-2 border-fuchsia-500 rounded-md mx-4 bg-indigo-200 bg-opacity-25 text-teal-900  px-5 py-2 hover:bg-fuchsia-400 hover:text-white">
          IDEAL WEIGHT
        </span>
      </Link>
      <Link to="/bodyfat">
        <span className="border-2 border-fuchsia-500 rounded-md mx-4 bg-indigo-200 bg-opacity-25 text-teal-900  px-5 py-2 hover:bg-fuchsia-400 hover:text-white">
          BODY FAT
        </span>
      </Link>
      <Link to="/dailycalorie">
        <span className="border-2 border-fuchsia-500 rounded-md mx-4 bg-indigo-200 bg-opacity-25 text-teal-900  px-5 py-2 hover:bg-fuchsia-400 hover:text-white">
          DAILY CALORIE
        </span>
      </Link>
      <Link to="/howitworks">
        <span className="border-2 border-fuchsia-500 rounded-md mx-4 bg-indigo-200 bg-opacity-25 text-teal-900  px-5 py-2 hover:bg-fuchsia-400 hover:text-white">
          HOW IT WORKS
        </span>
      </Link>
      <Link to="/mystats">
        <span className="border-2 border-fuchsia-500 rounded-md mx-4 bg-indigo-200 bg-opacity-25 text-teal-900  px-5 py-2 hover:bg-fuchsia-400 hover:text-white">
          MY STATS
        </span>
      </Link>
    </div>
  );
};

export default Navbar;
