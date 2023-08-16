import BodyFatComponent from "../components/BodyFatComponent";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux/";
import { fetchBodyFat } from "../redux/userInfoThunk";
import ButtonPrimary from "../components/CommonComponents/ButtonPrimary";
import ResultComponent from "../components/ResultComponent";
import CalculatorLayout from "../components/CalculatorLayout";

const BodyFat = () => {
  const user = useSelector((state) => state.user);
  const userGender = user.data.personalInfo.gender;
  const bodyFat = user.data.results.bodyFat;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const makeRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(fetchBodyFat())
    setLoading(false)
  }

  return (
    <CalculatorLayout >
      <ResultComponent loading={loading} title="BODY FAT CALCULATOR">
        {bodyFat &&
          <div>
            <h2>
              <span className="underline">BODY FAT RATIO:</span> %
              {bodyFat["Body Fat (U.S. Navy Method)"]},{" "}
              <span className="underline">CATEGORY:</span>{" "}
              {bodyFat["Body Fat Category"]?.toUpperCase()}
            </h2>
            <h2>
              <span className="underline">BODY FAT MASS:</span>{" "}
              {bodyFat["Body Fat Mass"]} KG,{" "}
              <span className="underline">LEAN MASS:</span>{" "}
              {bodyFat["Lean Body Mass"]} KG
            </h2>
          </div>
        }
      </ResultComponent>
      <div className="flex flex-col w-full mx-auto mt-4 lg:flex-row lg:w-1/2">
        <BodyFatComponent gender={"female"} />
        <BodyFatComponent gender={"male"} />
      </div>
      {userGender ? (
        <ButtonPrimary onClick={makeRequest} className="mt-4" loading={loading}>CALCULATE</ButtonPrimary>
      ) : <div className="h-[60px]"></div>}
    </CalculatorLayout>
  );
};
export default BodyFat;
