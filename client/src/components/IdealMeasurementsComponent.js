import { wrist } from "../data";
import { useSelector, useDispatch } from "react-redux";
import SelectInput from "./CommonComponents/SelectInput";
import CardComponent from "./CardComponent";
import GenderComponent from "./GetStartedComponents/GenderComponent";

const IdealMeasurementsComponent = ({ gender }) => {
  const user = useSelector((state) => state.user);
  const userGender = user.data.personalInfo.gender;

  return (
    !userGender ? (
      <GenderComponent gender={gender} />
    ) : (
      <CardComponent gender={gender}>
        {gender === "male" ? (
          <>
            <form className="flex flex-col items-center h-full md:text-2xl justify-evenly">
              <img
                className="my-1 h-1/3"
                src={require(`../assets/wrist-${gender}.png`)}
                alt="washing-hands"
              />
              <p className="text-sm">
                Please measure your wrist circumference with a tape measure in the
                area you normally wear a watch.
              </p>

              <SelectInput options={wrist} label="Wrist" name="wrist" reduxName="measurements" />
            </form>
          </>
        ) : (
          <span className="flex flex-col items-center h-full justify-evenly">
            <h2 className="font-semibold xl:text-2xl">
              LEARN YOUR IDEAL MEASUREMENTS!
            </h2>
            <p className="2xl:text-xl">
              The calculation is based on John McCallum’s formula who is a famous
              methodist. This formula is widely used because there is a good
              correlation between the wrist and the other body areas. The targets
              might look a little challenging at first but according to many
              studies, they are realistic.
            </p>
          </span>
        )}
      </CardComponent>
    )
  );
};

export default IdealMeasurementsComponent;
