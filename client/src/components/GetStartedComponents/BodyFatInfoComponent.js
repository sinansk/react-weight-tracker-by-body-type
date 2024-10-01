import React from "react";
import { useSelector } from "react-redux";
import InputPrimary from "../CommonComponents/InputPrimary";

const BodyFatInfoComponent = ({ gender }) => {

  const user = useSelector((state) => state.user);

  return (
    <div
      className={`card ${gender === "female"
        ? `card-primary`
        : `card-secondary`
        }
      `}
    >
      {gender === "male" ? (
        <>
          <form className="flex flex-row items-center flex-1 h-full -mt-4 text-xs md:text-2xl">
            <div className="flex w-full h-full gap-1 px-2">
              <div className="m-auto">
                <InputPrimary label="Neck" name="neck" reduxName='measurements' type="number" toolTip={true} />
                <InputPrimary label="Shoulder" name="shoulder" reduxName='measurements' type="number" toolTip={true} />
                <InputPrimary label="Chest" name="chest" reduxName='measurements' type="number" toolTip={true} />
                <InputPrimary label="Arm" name="arm" reduxName='measurements' type="number" toolTip={true} />
                <InputPrimary label="Fore Arm" name="forearm" reduxName='measurements' type="number" toolTip={true} />
              </div>
              <div className="m-auto">
                <InputPrimary label="Wrist" name="wrist" reduxName='measurements' type="number" toolTip={true} />
                <InputPrimary label="Waist" name="waist" reduxName='measurements' type="number" toolTip={true} />
                <InputPrimary label="Hip" name="hip" reduxName='measurements' type="number" toolTip={true} />
                <InputPrimary label="Thigh" name="thigh" reduxName='measurements' type="number" toolTip={true} />
                <InputPrimary label="Calve" name="calve" reduxName='measurements' type="number" toolTip={true} />
              </div>
            </div>
          </form>
        </>
      ) : (
        <span className="flex flex-col items-center h-full">
          <h2 className="font-semibold xl:text-2xl">SET YOUR MEASUREMENTS</h2>
          <img
            className="md:my-4 h-2/5"
            src={require(`../../assets/body-${user.data.personalInfo.gender}.png`)}
            alt="washing-hands"
          />
          <p className="text-xs font-semibold lg:text-base">
            Please measure your neck at widest point, your chest just under your
            armpit, your arm and leg muscles at largest point, your waist over
            belly button and your hip over largest point with a tape measure.
          </p>
        </span>
      )}
    </div>
  );
};

export default BodyFatInfoComponent;
