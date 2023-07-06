import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import IdealWeight from "./pages/IdealWeight";
import MyStats from "./pages/MyStats";
import BodyFat from "./pages/BodyFat";
import DailiyCalorie from "./pages/DailiyCalorie";
import IdealMeasurements from "./pages/IdealMeasurements";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GetStarted from "./pages/GetStarted";
import { useSelector } from "react-redux";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="items-center justify-center w-full h-full text-center bg-gradient-to-r from-rose-100 via-violet-100 to-cyan-100">
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/idealweight" element={<IdealWeight />} />
          <Route path="/bodyfat" element={<BodyFat />} />
          <Route path="/dailycalorie" element={<DailiyCalorie />} />
          <Route path="/idealmeasurements" element={<IdealMeasurements />} />
          <Route path="/mystats" element={<MyStats />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/getstarted"
            element={currentUser ? <GetStarted to="/getstarted" /> : <Login />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
