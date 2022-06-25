import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BigContainer from "../components/BigContainer";
import ResultComponent from "../components/ResultComponent";

const IdealWeight = () => {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <BigContainer />
      {/* <Footer /> */}
      <ResultComponent />
    </div>
  );
};

export default IdealWeight;
