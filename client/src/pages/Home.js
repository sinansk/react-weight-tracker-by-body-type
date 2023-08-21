import { useEffect } from "react";
import HomeComponent from "../components/HomeComponent";
import { useDispatch } from "react-redux/";
import { reset } from "../redux/userRedux";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center w-screen overflow-hidden lg:h-[calc(100vh-122px)]">

      <div className="h-12 mx-auto sm:w-1/2 xl:h-24">
        <div className="flex flex-col items-center justify-center mx-4 text-sm text-white border-2 border-teal-400 rounded-md xl:text-2xl bg-teal-400/60 opacity-90 xl:h-full">
          <h2>SELECT YOUR GENDER</h2>
        </div>
      </div>
      <div className="flex flex-col w-full mt-4 lg:flex-row lg:w-1/2">
        <HomeComponent gender={"female"} />
        <HomeComponent gender={"male"} />
      </div>
    </div>
  );
};

export default Home;
