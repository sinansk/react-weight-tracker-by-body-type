import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/CommonComponents/Navbar";
import ReactJoyride from "react-joyride";
import { useDispatch, useSelector } from "react-redux";
import { calorieTrackerSteps, myStatsSteps } from "../components/TourSteps";
import {
  setTourSteps,
  setTourActive,
  setTourRun,
  setTourStepIndex,
} from "../redux/uiTour";

const WithNavbar = () => {
  const steps = useSelector((state) => state.uiTour?.steps);
  const tourRun = useSelector((state) => state.uiTour?.run);
  const tourStepIndex = useSelector((state) => state.uiTour?.stepIndex);
  const location = useLocation();
  const tourActive = useSelector((state) => state.uiTour?.tourActive);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (tourActive) {
      if (location.pathname === "/mystats") {
        dispatch(setTourSteps(myStatsSteps));
        dispatch(setTourRun(true));
      } else if (location.pathname === "/calorie-tracker") {
        dispatch(setTourSteps(calorieTrackerSteps));
        dispatch(setTourRun(true));
      } else {
        dispatch(setTourRun(false));
        dispatch(setTourActive(false));
      }
    }
  }, [location.pathname, tourActive]);

  const handleCallback = (data) => {
    const { action, index, lifecycle, type } = data;

    // Handle the tour navigation logic here
    if (type === "step:after" && index < steps.length - 1) {
      dispatch(setTourStepIndex(index + 1));
    } else if (type === "step:after" && index === steps.length - 1) {
      dispatch(setTourRun(false));
      dispatch(setTourStepIndex(0));
      dispatch(setTourActive(false));
    } else if (type === "step:after" && action === "prev" && index === 0) {
      dispatch(setTourRun(false));
    } else if (action === "reset" || lifecycle === "complete") {
      dispatch(setTourRun(false));
      dispatch(setTourStepIndex(0));
      dispatch(setTourActive(false));
    } else if (action === "close") {
      dispatch(setTourRun(false));
      dispatch(setTourStepIndex(0));
      dispatch(setTourActive(false));
    } else if (action === "skip") {
      dispatch(setTourRun(false));
      dispatch(setTourStepIndex(0));
      dispatch(setTourActive(false));
    }

    // Handle the special case for transitioning to calorie tracker
    if (location.pathname === "/mystats" && index === 6) {
      dispatch(setTourRun(false));
      dispatch(setTourStepIndex(0));
      dispatch(setTourSteps(calorieTrackerSteps));
      setTourActive(true);
      navigate("/calorie-tracker");
    } else if (location.pathname === "/calorie-tracker" && index === 0) {
      dispatch(setTourRun(true));
    }
  };

  return (
    <div className="overflow-x-hidden max-w-screen">
      <Navbar />
      <Outlet />
      {steps?.length > 0 && tourRun && tourActive && (
        <ReactJoyride
          steps={steps}
          callback={handleCallback}
          stepIndex={tourStepIndex}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          run={tourRun}
          styles={{
            options: {
              arrowColor: "#fffbeb",
              backgroundColor: "#fffbeb",
              primaryColor: "#0284c7",
              textColor: "#004a14",
              zIndex: 1000,
            },
          }}
        />
      )}
    </div>
  );
};

export default WithNavbar;
