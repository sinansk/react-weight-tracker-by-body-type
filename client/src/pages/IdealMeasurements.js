import { useState } from "react";
import IdealMeasurementsComponent from "../components/IdealMeasurementsComponent";
import { useSelector, useDispatch } from "react-redux";
import { updateIdealMeasurements } from "../redux/userInfoThunk";
import ButtonPrimary from "../components/CommonComponents/ButtonPrimary";
import ResultComponent from "../components/ResultComponent";
import CalculatorLayout from "../components/CalculatorLayout";
const IdealMeasurements = () => {
  const user = useSelector((state) => state.user);
  const userGender = user.data?.personalInfo.gender;
  const idealMeasurements = user.data?.idealMeasurements;
  const idealChest = idealMeasurements?.chest;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const calculateMeasurements = async (e) => {
    setLoading(true)
    e.preventDefault();
    await dispatch(updateIdealMeasurements());
    setLoading(false)
  }

  return (
    <CalculatorLayout >
      <ResultComponent loading={loading} title="IDEAL MEASUREMENTS CALCULATOR">
        {idealChest && (
          <>
            <h2 className="font-bold sm:text-2xl"> YOUR IDEAL MEASUREMENTS</h2>
            <p>
              Neck: {idealMeasurements.neck}, Chest: {idealChest}
              , Shoulder:{idealMeasurements.shoulder}, Arm:{" "}
              {idealMeasurements.arm}, Forearm:{" "}
              {idealMeasurements.forearm}, Waist:{" "}
              {idealMeasurements.waist}, Hip:{" "}
              {idealMeasurements.hip}, Thigh:{" "}
              {idealMeasurements.thigh}, Calve:{" "}
              {idealMeasurements.calve}
            </p>
          </>
        )}
      </ResultComponent>
      <div className="flex flex-col w-full mx-auto mt-4 lg:flex-row lg:w-1/2">
        <IdealMeasurementsComponent gender={"female"} />
        <IdealMeasurementsComponent gender={"male"} />
      </div>
      {userGender ? (
        <ButtonPrimary onClick={calculateMeasurements} className="mt-4" loading={loading}>CALCULATE</ButtonPrimary>
      ) : <div className="h-[60px]"></div>}
    </CalculatorLayout>
  );
};

export default IdealMeasurements;
