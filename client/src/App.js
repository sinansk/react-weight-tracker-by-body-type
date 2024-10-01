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
import CalorieTracker from "./pages/CalorieTracker";
import Modal from "./components/modals/Modal";
import LoadingComponent from "./components/CommonComponents/Loaders/LoadingComponent";
import Test from "./pages/Test";
import ProfileSettings from "./pages/ProfileSettings";
import ReactJoyride from "react-joyride";
import { calorieTrackerSteps, myStatsSteps, steps } from "./components/TourSteps";

const App = () => {

  return (
    <div className="w-full min-h-screen pb-10 text-center bg-gradient-to-r from-teal-900 via-slate-700 to-slate-800">

      <Toaster position="top-right" />
      {/* <LoadingComponent /> */}
      <Modal />
      <Router>
        <Routes>
          <Route element={<WithNavbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/idealweight" element={<IdealWeight />} />
            <Route path="/bodyfat" element={<BodyFat />} />
            <Route path="/dailycalorie" element={<DailiyCalorie />} />
            <Route path="/idealmeasurements" element={<IdealMeasurements />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/test" element={<Test />} />
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
              <Route path="/calorie-tracker" element={<CalorieTracker />} />
              <Route path="/settings" element={<ProfileSettings />} />
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
