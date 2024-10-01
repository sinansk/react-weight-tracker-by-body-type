import { heights, weights, ages, neck, waist, hip } from "../data";
import { useSelector } from "react-redux";
import SelectInput from "./CommonComponents/SelectInput";
import CardComponent from "./CardComponent";
import GenderComponent from "./GetStartedComponents/GenderComponent";

const BodyFatComponent = ({ gender }) => {
  const user = useSelector((state) => state.user);
  const personalInfo = user.data.personalInfo;
  const userGender = personalInfo.gender;

  return (
    !userGender ? (
      <GenderComponent gender={gender} />
    ) : (
      <CardComponent gender={gender}>
        {gender === "male" ? (
          <>
            <form className="flex flex-row items-center h-full gap-2 md:text-2xl">
              <div className="flex flex-col w-1/2 h-full sm:px-4 justify-evenly">
                <SelectInput options={ages} label="Age" name="age" className="w-32" reduxName={`personalInfo`} />
                <SelectInput options={heights} label="Height" name="height" className="w-32" reduxName={`personalInfo`} />
                <SelectInput options={weights} label="Weight" name="weight" className="w-32" reduxName={`personalInfo`} />
              </div>
              <div className="flex flex-col w-1/2 h-full sm:px-4 justify-evenly">
                <SelectInput options={neck} label="Neck" name="neck" className="w-32" reduxName="measurements" type="number" />
                <SelectInput options={waist} label="Waist" name="waist" className="w-32" reduxName="measurements" />
                <SelectInput options={hip} label="Hip" name="hip" className="w-32" reduxName="measurements" />
              </div>
            </form>
          </>
        ) : (
          <span className="flex flex-col items-center h-full">
            <h2 className="font-semibold xl:text-2xl">MEASURE YOUR BODY!</h2>
            <img
              className="md:my-4 h-2/5"
              src={require(`../assets/body-${userGender}.png`)}
              alt="washing-hands"
            />
            <p className="lg:text-lg 2xl:text-xl">
              Please measure your neck at widest point, your waist over belly
              button and your hip over largest point with a tape measure.
            </p>
          </span>
        )}
      </CardComponent>
    )
  );
};

export default BodyFatComponent;
