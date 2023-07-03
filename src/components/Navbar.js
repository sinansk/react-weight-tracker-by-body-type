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
  return (
    <div className="flex items-center justify-between border-gray-400 lg:border-b ">
      <nav className="flex w-screen ">
        <section className="flex justify-between px-4 py-4 ml-auto lg:hidden">
          <div
            className="space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block w-8 h-0.5 bg-fuchsia-600 animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-fuchsia-600 animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-fuchsia-600 animate-pulse"></span>
          </div>

          <div
            className={`${
              isNavOpen
                ? `flex flex-col justify-evenly items-center absolute top-0 left-0 bg-gradient-to-r from-rose-100 via-violet-100 to-cyan-100  z-10 w-screen h-screen`
                : `hidden`
            }`}
          >
            <div
              className="absolute top-0 right-0 px-4 py-4"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="w-8 h-8 text-fuchsia-600"
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
              <li className="my-8 uppercase border-b border-gray-400">
                <NavLink to="/">RESET</NavLink>
              </li>
              <li className="my-8 uppercase border-b border-gray-400">
                <NavLink to="/idealweight">IDEAL WEIGHT</NavLink>
              </li>
              <li className="my-8 uppercase border-b border-gray-400">
                <NavLink to="/bodyfat">BODY FAT</NavLink>
              </li>
              <li className="my-8 uppercase border-b border-gray-400">
                <NavLink to="/dailycalorie">DAILY CALORIE</NavLink>
              </li>
              <li className="my-8 uppercase border-b border-gray-400">
                <NavLink to="/idealmeasurements">IDEAL MEASUREMENTS</NavLink>
              </li>
              <li className="my-8 uppercase border-b border-gray-400">
                <NavLink to={`${currentUser ? "/mystats" : "/register"}`}>
                  {`${currentUser ? "MY STATS" : "REGISTER"}`}
                </NavLink>
              </li>
              <li className="my-8 uppercase border-b border-gray-400">
                <>
                  {!currentUser ? (
                    <NavLink to={`${currentUser ? "/mystats" : "/login"}`}>
                      LOGIN
                    </NavLink>
                  ) : (
                    <NavLink onClick={handleLogout} to="/login">
                      LOG OUT
                    </NavLink>
                  )}
                </>
              </li>
            </ul>
          </div>
        </section>

        <div className="items-center hidden mb-2 bg-transparent md:min-h-8 md:py-1 xl:px-10 lg:w-screen lg:flex sm:flex-1 justify-evenly">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-fuchsia-400 text-white"
                : "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-indigo-200 bg-opacity-25 text-teal-900"
            }
          >
            RESET
          </NavLink>
          <NavLink
            to="/idealweight"
            className={({ isActive }) =>
              isActive
                ? "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-fuchsia-400 text-white"
                : "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-indigo-200 bg-opacity-25 text-teal-900"
            }
          >
            IDEAL WEIGHT
          </NavLink>
          <NavLink
            to="/bodyfat"
            className={({ isActive }) =>
              isActive
                ? "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-fuchsia-400 text-white"
                : "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-indigo-200 bg-opacity-25 text-teal-900"
            }
          >
            BODY FAT
          </NavLink>
          <NavLink
            to="/dailycalorie"
            className={({ isActive }) =>
              isActive
                ? "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-fuchsia-400 text-white"
                : "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-indigo-200 bg-opacity-25 text-teal-900"
            }
          >
            DAILY CALORIE
          </NavLink>
          <NavLink
            to="/idealmeasurements"
            className={({ isActive }) =>
              isActive
                ? "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-fuchsia-400 text-white"
                : "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-indigo-200 bg-opacity-25 text-teal-900"
            }
          >
            IDEAL MEASUREMENTS
          </NavLink>
          <NavLink
            to={`${currentUser ? "/mystats" : "/register"}`}
            className={({ isActive }) =>
              isActive
                ? "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-fuchsia-400 text-white"
                : "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-indigo-200 bg-opacity-25 text-teal-900"
            }
          >
            {`${currentUser ? "MY STATS" : "REGISTER"}`}
          </NavLink>

          <>
            {!currentUser ? (
              <NavLink
                to={`${currentUser ? "/mystats" : "/login"}`}
                className={({ isActive }) =>
                  isActive
                    ? "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-fuchsia-400 text-white"
                    : "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-indigo-200 bg-opacity-25 text-teal-900"
                }
              >
                LOGIN
              </NavLink>
            ) : (
              <NavLink
                onClick={handleLogout}
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-fuchsia-400 text-white"
                    : "border-2 border-fuchsia-500 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-indigo-200 bg-opacity-25 text-teal-900"
                }
              >
                LOGOUT
              </NavLink>
            )}
          </>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
