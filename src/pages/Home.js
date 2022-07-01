import { useEffect } from "react";
import HomeComponent from "../components/HomeComponent";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux/";
import { reset } from "../redux/userRedux";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="mx-auto sm:w-1/2 h-12 xl:h-24">
        <div className="flex flex-col items-center justify-center mx-4 xl:text-2xl text-white bg-fuchsia-400  border-2 rounded-md border-fuchsia-500 xl:h-full">
          <h2>SELECT YOUR GENDER</h2>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row flex-1 lg:w-1/2 mx-auto mt-4">
        <HomeComponent gender={"female"} />
        <HomeComponent gender={"male"} />
      </div>
    </div>
  );
};

export default Home;
