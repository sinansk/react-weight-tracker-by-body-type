import Home from "./pages/Home";
import BodyTypes from "./pages/BodyTypes";
import MyStats from "./pages/MyStats";

function App() {
  return (
    <div className="w-screen items-center justify-center h-screen text-center bg-gradient-to-r from-rose-100 via-violet-100 to-cyan-100">
      <Home />
      <BodyTypes />
      <MyStats />
    </div>
  );
}

export default App;
