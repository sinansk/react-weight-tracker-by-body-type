import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutHandle } from "../redux/userRedux";
import { logOut } from "../firebase";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logOut();
    dispatch(logoutHandle());
  };

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const NavLinks = [
    { path: "/", text: "RESET" },
    { path: "/idealweight", text: "IDEAL WEIGHT" },
    { path: "/bodyfat", text: "BODY FAT" },
    { path: "/dailycalorie", text: "DAILY CALORIE" },
    { path: "/idealmeasurements", text: "IDEAL MEASUREMENTS" },
    ...(currentUser
      ? [{ path: "/mystats", text: "MY STATS" }]
      : [
        { path: "/register", text: "REGISTER" },
        { path: "/login", text: "LOGIN" },
      ]),
  ];

  return (
    <div className="flex items-center justify-between border-gray-400 lg:border-b">
      <nav className="flex w-screen">
        <section className="flex justify-between px-4 py-4 ml-auto lg:hidden">
          <div className="space-y-2" onClick={toggleNav}>
            <span className="block w-8 h-0.5 bg-pink-600 animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-pink-600 animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-pink-600 animate-pulse"></span>
          </div>
          <div className={`${isNavOpen ? `flex flex-col justify-evenly items-center absolute top-0 left-0 bg-gradient-to-r from-rose-100 via-violet-100 to-cyan-100 z-10 w-screen h-screen` : `hidden`}`}>
            <div className="absolute top-0 right-0 px-4 py-4" onClick={() => setIsNavOpen(false)}>
              <svg
                className="w-8 h-8 text-pink-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              {NavLinks.map(({ path, text }, index) => (
                <li key={index} className="my-8 uppercase border-b border-gray-400">
                  <NavLink to={path} onClick={toggleNav}>
                    {text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <div className="items-center hidden mb-2 bg-transparent md:min-h-8 md:py-1 xl:px-10 lg:w-screen lg:flex sm:flex-1 justify-evenly transition-all-900">
          {NavLinks.map(({ path, text }, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "border-2 border-pink-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-pink-400 text-white"
                  : "border-2 border-pink-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-pink-200 bg-opacity-25 text-teal-900"
              }
            >
              {text}
            </NavLink>
          ))}
          {currentUser && (
            <NavLink
              to="/login"
              onClick={handleLogout}
              className="px-5 py-2 mx-1 text-teal-900 bg-pink-200 bg-opacity-25 border-2 border-pink-500 rounded-md lg:mx-4"
            >
              LOG OUT
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
