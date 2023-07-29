import { useState } from "react";
import { login } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    console.log("loginpage", user)
    // user.emailVerified &&
    user &&
      navigate("/mystats", {
        replace: true,
      });

  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="flex max-w-3xl p-5 bg-gray-100 shadow-lg rounded-2xl">
        <div className="px-5 md:w-1/2">
          <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>
          <p className="text-sm mt-4 text-[#002D74]">If you have an account, please login</p>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name=""
                id=""
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 mt-2 bg-gray-200 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete="on"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name=""
                id=""
                placeholder="Enter Password"
                minLength="6"
                className="w-full px-4 py-3 mt-2 bg-gray-200 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-2 text-right">
              <a
                href=""
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <button
              diabled={email || password}
              type="submit"
              className="block w-full px-4 py-3 mt-6 font-semibold text-white bg-pink-500 rounded-lg hover:bg-pink-400 focus:bg-pink-400"
            >
              Log In
            </button>
          </form>

          <div className="grid items-center grid-cols-3 text-gray-500 mt-7">
            <hr className="border-gray-500" />
            <p className="text-sm text-center">OR</p>
            <hr className="border-gray-500" />
          </div>

          <button className="flex items-center justify-center w-full py-2 mt-5 text-sm duration-300 bg-white border rounded-xl hover:scale-105 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="w-6 h-6"
              viewBox="0 0 48 48"
            >
              <defs>
                <path
                  id="a"
                  d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                />
              </defs>
              <clipPath id="b">
                <use xlinkHref="#a" overflow="visible" />
              </clipPath>
              <path
                clipPath="url(#b)"
                fill="#FBBC05"
                d="M0 37V11l17 13z"
              />
              <path
                clipPath="url(#b)"
                fill="#EA4335"
                d="M0 11l17 13 7-6.1L48 14V0H0z"
              />
              <path
                clipPath="url(#b)"
                fill="#34A853"
                d="M0 37l30-23 7.9 1L48 0v48H0z"
              />
              <path
                clipPath="url(#b)"
                fill="#4285F4"
                d="M48 48L17 24l-4-3 35-10z"
              />
            </svg>
            <span className="ml-4">Login with Google</span>
          </button>

          <div className="flex items-center justify-between mt-3 text-sm">
            <p>If you don't have an account...</p>
            <button onClick={() => navigate("/register", { replace: true })} className="px-5 py-2 ml-3 duration-300 bg-white border border-blue-400 rounded-xl hover:scale-110">
              Register
            </button>
          </div>
        </div>

        <div className="hidden w-1/2 md:block">
          <img
            src="https://images.unsplash.com/photo-1566351573868-0b6458790cb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            className="rounded-2xl"
            alt="page img"
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
