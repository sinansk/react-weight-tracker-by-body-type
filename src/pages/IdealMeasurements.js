import Navbar from "../components/Navbar";
import { useState } from "react";
import IdealMeasurementsComponent from "../components/IdealMeasurementsComponent";
import { useSelector, useDispatch } from "react-redux";
import { setIdealMeasurements } from "../redux/userRedux";

const IdealMeasurements = () => {
  const user = useSelector((state) => state.user);
  const userGender = user.userGender;
  const idealMeasurements = user.idealMeasurements;
  const idealChestSize = idealMeasurements.idealChestSize;

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  function calculateMeasurements(e) {
    e.preventDefault();
    dispatch(setIdealMeasurements());
  }

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="mx-auto sm:w-1/2 h-12 xl:h-24">
        <div className="flex flex-col items-center justify-center mx-4 text-sm xl:text-2xl text-white bg-fuchsia-400  border-2 rounded-md border-fuchsia-500 xl:h-full">
          {idealChestSize ? (
            <>
              <h2 className="underline">
                {" "}
                {!loading ? (
                  "IDEAL MEASUREMENTS ARE (cm)"
                ) : (
                  <svg
                    role="status"
                    className="inline w-6 h-6 animate-spin fill-cyan-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )}
              </h2>
              <p>
                Neck: {idealMeasurements.idealNeckSize}, Chest: {idealChestSize}
                , Shoulder:{idealMeasurements.idealShoulderSize}, Arm:{" "}
                {idealMeasurements.idealArmSize}, Forearm:{" "}
                {idealMeasurements.idealForeArmSize}, Waist:{" "}
                {idealMeasurements.idealWaistSize}, Hip:{" "}
                {idealMeasurements.idealHipSize}, Thigh:{" "}
                {idealMeasurements.idealThighSize}, Calve:{" "}
                {idealMeasurements.idealCalveSize}
              </p>
            </>
          ) : (
            <h2>IDEAL MEASUREMENTS CALCULATOR</h2>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 lg:w-1/2 mx-auto mt-4">
        <IdealMeasurementsComponent gender={"female"} />
        <IdealMeasurementsComponent gender={"male"} />
      </div>
      {userGender && (
        <a
          onClick={calculateMeasurements}
          className="relative inline-flex items-center px-8 py-3 sm:mt-4 overflow-hidden text-white rounded-sm bg-fuchsia-500 group active:bg-fuchsia-300 focus:outline-none focus:ring"
          href="/"
        >
          <span className="absolute left-0 transition-transform -translate-x-full group-hover:translate-x-4">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>

          <span className="text-sm font-medium transition-all group-hover:ml-4">
            {!loading ? (
              "CALCULATE"
            ) : (
              <svg
                role="status"
                className="inline w-4 h-4 mr-2 animate-spin fill-cyan-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
          </span>
        </a>
      )}
    </div>
  );
};

export default IdealMeasurements;
