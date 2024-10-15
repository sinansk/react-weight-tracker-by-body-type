import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutHandle } from "../../redux/userRedux";
import { logOut } from "../../firebase";
import { MdLogout } from "react-icons/md";
import useOutSideClick from "../../utils/useOutsideClick";
const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logOut();
    dispatch(logoutHandle());
  };

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };
  const NavLinks = [
    // { path: "/idealweight", text: "IDEAL WEIGHT" },
    // { path: "/bodyfat", text: "BODY FAT" },
    // { path: "/dailycalorie", text: "DAILY CALORIE" },
    // { path: "/idealmeasurements", text: "IDEAL MEASUREMENTS" },
    ...(currentUser
      ? [
          {
            path: "/calorie-tracker",
            text: "CALORIE TRACKER",
            tourClassName: "calorie-tracker",
          },
          { path: "/mystats", text: "MY STATS", tourClassName: "mystats" },
        ]
      : [
          // { path: "/register", text: "REGISTER" },
          // { path: "/login", text: "LOGIN" },
        ]),
  ];
  // if (!currentUser) {
  //   NavLinks.unshift({ path: "/", text: "RESET" });
  // }

  useOutSideClick(profileMenuRef, setIsMenuOpen);
  return (
    <div className="z-50 flex items-center justify-between overflow-hidden border-gray-400 transition-all-300 lg:border-b">
      <nav className="flex w-screen">
        <section className="z-50 flex justify-between max-h-screen px-4 py-4 ml-auto overflow-hidden lg:hidden">
          <div className="space-y-2" onClick={toggleNav}>
            <span className="block w-8 h-0.5 bg-teal-600 animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-teal-600 animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-teal-600 animate-pulse"></span>
          </div>
          <div
            className={`${
              isNavOpen
                ? `flex flex-col justify-evenly items-center absolute top-0 left-0 right-0 bottom-0 overflow-hidden bg-gradient-to-r from-teal-900 via-slate-700 to-slate-800 text-gray-200 z-10 w-screen h-screen`
                : `hidden`
            }`}
          >
            <div
              className="absolute top-0 right-0 px-4 py-4"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="w-8 h-8 text-teal-600"
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
                <li
                  key={index}
                  className="my-5 uppercase border-b border-gray-400"
                >
                  <NavLink to={path} onClick={toggleNav}>
                    {text}
                  </NavLink>
                </li>
              ))}
              {currentUser && (
                <>
                  <li className="my-5 uppercase border-b border-gray-400">
                    <NavLink
                      onClick={toggleNav}
                      to="/settings"
                      className="block px-4 py-2 text-left text-gray-200 hover:bg-gray-700"
                    >
                      Settings
                    </NavLink>
                  </li>
                  <li className="my-5 uppercase border-b border-gray-400">
                    <NavLink
                      to={"/login"}
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-700"
                    >
                      Logout
                      <MdLogout
                        size={20}
                        className="inline-block ml-4 text-gray-200"
                      />
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </section>
        <div className="items-center hidden mb-2 bg-transparent md:min-h-8 md:py-1 xl:px-10 lg:w-screen lg:flex sm:flex-1 justify-evenly transition-all-900">
          {NavLinks.map(({ path, text, tourClassName }, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? `${tourClassName} border-2 border-teal-600 rounded-md mx-1 lg:mx-4 px-5 py-2 bg-teal-500 text-white`
                  : `${tourClassName}  rounded-md mx-1 lg:mx-4 px-5 py-2 relative text-gray-200 after:bg-teal-500 after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300`
              }
            >
              {text}
            </NavLink>
          ))}
          {currentUser && (
            <div className="z-30" ref={profileMenuRef}>
              <button
                onClick={toggleMenu}
                className="relative px-5 py-2 mx-1 text-gray-200 border-2 border-teal-600 rounded-md lg:mx-4"
              >
                PROFILE
              </button>
              {isMenuOpen && (
                <div className="absolute py-2 mt-2 border rounded shadow-lg bg-slate-800">
                  <NavLink
                    onClick={() => setIsMenuOpen(false)}
                    to="/settings"
                    className="block px-4 py-2 text-left text-gray-200 hover:bg-gray-700"
                  >
                    Settings
                  </NavLink>
                  <NavLink
                    to={"/login"}
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-700"
                  >
                    Logout
                    <MdLogout
                      size={20}
                      className="inline-block ml-4 text-gray-200"
                    />
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
