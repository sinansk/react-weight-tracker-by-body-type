import { useState } from "react";
import DailyCalorieComponent from "../components/DailyCalorieComponent";
import { useDispatch, useSelector } from "react-redux/";
import { fetchCalorieNeed, fetchMacroNeed } from "../redux/userInfoThunk";
import ButtonPrimary from "../components/CommonComponents/ButtonPrimary";
import ResultComponent from "../components/ResultComponent";
import CalculatorLayout from "../components/CalculatorLayout";

const DailiyCalorie = () => {
  const user = useSelector((state) => state.user);
  const userGender = user.data.personalInfo.gender;
  const bodyGoal = user.data.personalInfo.bodyGoal;
  const calorieNeed = user.data.results?.calorieNeed;
  const calorieNeedByBodyGoal = user.data.results?.calorieNeedByBodyGoal
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const makeRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(fetchCalorieNeed())
    await dispatch(fetchMacroNeed())
    setLoading(false)
  }

  return (
    <CalculatorLayout>
      <ResultComponent loading={loading} title="DAILY CALORIE CALCULATOR">
        {calorieNeed &&
          <>
            <h2 className="">
              DAILY CALORIE NEED FOR {bodyGoal.toUpperCase()}
            </h2>
            <h2>{calorieNeedByBodyGoal}</h2>
          </>
        }
      </ResultComponent>
      <div className="flex flex-col w-full mx-auto mt-4 lg:flex-row lg:w-1/2">
        <DailyCalorieComponent gender={"female"} />
        <DailyCalorieComponent gender={"male"} />
      </div>
      {userGender ? (
        <ButtonPrimary onClick={makeRequest} className="mt-4" loading={loading}>CALCULATE</ButtonPrimary>
      ) : <div className="h-[60px]"></div>}
    </CalculatorLayout>
  );
};
export default DailiyCalorie;
