import { useState } from "react";
import Navbar from "../components/Navbar";
import { register } from "../firebase";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password);
    console.log(user);
    navigate("/getstarted", {
      replace: true,
    });
  };

  return (
    <div>
      <Navbar />
      <div>
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
          <button disbaled={email || password} type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
