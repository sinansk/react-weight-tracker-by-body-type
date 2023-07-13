import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import IdealWeight from "./pages/IdealWeight";
import MyStats from "./pages/MyStats";
import BodyFat from "./pages/BodyFat";
import DailiyCalorie from "./pages/DailiyCalorie";
import IdealMeasurements from "./pages/IdealMeasurements";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GetStarted from "./pages/GetStarted";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import WithNavbar from "./routes/WithNavbar";
import WithOutNavbar from "./routes/WithOutNavbar";

const App = () => {
  return (
    <div className="w-full h-full min-h-screen text-center bg-gradient-to-r from-rose-100 via-violet-100 to-cyan-100">

      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route element={<WithNavbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/idealweight" element={<IdealWeight />} />
            <Route path="/bodyfat" element={<BodyFat />} />
            <Route path="/dailycalorie" element={<DailiyCalorie />} />
            <Route path="/idealmeasurements" element={<IdealMeasurements />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Route>
          <Route element={<WithOutNavbar />}>
            <Route element={<AuthRoutes />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route element={<WithNavbar />}>
              <Route path="/mystats" element={<MyStats />} />
            </Route>
            <Route element={<WithOutNavbar />}>
              <Route path="/getstarted" element={<GetStarted />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
