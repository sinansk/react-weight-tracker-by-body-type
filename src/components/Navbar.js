import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-teal-500 h-10 w-screen flex flex-1 justify-evenly items-center">
      <Link to="/">HOME</Link>
      <Link to="/idealweight">IDEAL WEIGHT</Link>
      <Link to="/bodyfat">BODY FAT</Link>
      <Link to="/dailycalorie">DAILY CALORIE</Link>
      <Link to="/howitworks">HOW IT WORKS</Link>
      <Link to="/mystats">MY STATS</Link>
    </div>
  );
};

export default Navbar;
