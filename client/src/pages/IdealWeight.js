import { useState } from "react";
import IdealWeightComponent from "../components/IdealWeightComponent";
import { useSelector, useDispatch } from "react-redux/";
import { fetchIdealWeight } from "../redux/userInfoThunk";
import ButtonPrimary from "../components/CommonComponents/ButtonPrimary";
import ResultComponent from "../components/ResultComponent";
import CalculatorLayout from "../components/CalculatorLayout";

const IdealWeight = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userGender = user.data?.personalInfo.gender;
  // const idealWeight = user.data.results?.idealWeight;
  const idealWeightRange = user.data.results?.idealWeightRange;
  const idealWeightStatus = user.data.results?.idealWeightStatus;
  const [loading, setLoading] = useState(false);
  const makeRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(fetchIdealWeight());
    setLoading(false);
  };

  return (
    <CalculatorLayout>
      <ResultComponent loading={loading} title="IDEAL WEIGHT CALCULATOR">
        {idealWeightRange && (
          <>
            <h2>YOUR IDEAL WEIGHT RANGE IS: {idealWeightRange}</h2>
            <h2>{idealWeightStatus}</h2>
          </>
        )}
      </ResultComponent>
      <div className="flex flex-col w-full mx-auto mt-4 lg:flex-row lg:w-1/2">
        <IdealWeightComponent gender={"female"} />
        <IdealWeightComponent gender={"male"} />
      </div>
      {userGender ? (
        <ButtonPrimary onClick={makeRequest} className="mt-4" loading={loading}>
          CALCULATE
        </ButtonPrimary>
      ) : (
        <div className="h-[60px]"></div>
      )}
    </CalculatorLayout>
  );
};
export default IdealWeight;
