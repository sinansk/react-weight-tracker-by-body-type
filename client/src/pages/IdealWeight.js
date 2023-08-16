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
  const idealWeight = user.data.results?.idealWeight;
  const [loading, setLoading] = useState(false);
  const makeRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(fetchIdealWeight())
    setLoading(false);
  };

  return (
    <CalculatorLayout>
      <ResultComponent loading={loading} title="IDEAL WEIGHT CALCULATOR">
        {idealWeight?.length > 0 && (
          <>
            <h2>
              YOUR IDEAL WEIGHT RANGE IS: {idealWeight[0]} - {idealWeight[3]}{" "}
              KG.
            </h2>
            {user.data.personalInfo.weight < idealWeight[0] && (
              <h2>YOU NEED TO GAIN {idealWeight[0] - user.data.personalInfo.weight} KG.</h2>
            )}
            {user.data.personalInfo.weight > idealWeight[3] && (
              <h2>YOU NEED TO LOSS {user.data.personalInfo.weight - idealWeight[3]} KG.</h2>
            )}
            {idealWeight[0] <= user.weight &&
              user.data.personalInfo.weight <= idealWeight[3] && <h2>YOUR WEIGHT IS IDEAL.</h2>}
          </>
        )}
      </ResultComponent>
      <div className="flex flex-col w-full mx-auto mt-4 lg:flex-row lg:w-1/2">
        <IdealWeightComponent gender={"female"} />
        <IdealWeightComponent gender={"male"} />
      </div>
      {userGender ? (
        <ButtonPrimary onClick={makeRequest} className="mt-4" loading={loading}>CALCULATE</ButtonPrimary>
      ) : <div className="h-[60px]"></div>}
    </CalculatorLayout>
  );
};
export default IdealWeight;
