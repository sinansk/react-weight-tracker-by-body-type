import { useState } from "react";
import { login } from "../firebase";
import {
  login as loginHandle,
  logout as logoutHandle,
} from "../redux/userRedux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    user.emailVerified &&
      navigate("/getstarted", {
        replace: true,
      });
  };
  return (
    <div>
      <Navbar />
      <div className="grid gap-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button diabled={email || password} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
