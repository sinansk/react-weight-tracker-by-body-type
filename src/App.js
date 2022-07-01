import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import IdealWeight from "./pages/IdealWeight";

import MyStats from "./pages/MyStats";
import BodyFat from "./pages/BodyFat";
import DailiyCalorie from "./pages/DailiyCalorie";
import IdealMeasurements from "./pages/IdealMeasurements";

function App() {
  return (
    <div className="w-full h-full items-center justify-center text-center bg-gradient-to-r from-rose-100 via-violet-100 to-cyan-100">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/idealweight" element={<IdealWeight />} />
          <Route path="/bodyfat" element={<BodyFat />} />
          <Route path="/dailycalorie" element={<DailiyCalorie />} />
          <Route path="/idealmeasurements" element={<IdealMeasurements />} />
          {/* <Route path="/mystats" element={<MyStats />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
