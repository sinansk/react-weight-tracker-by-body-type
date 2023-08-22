import React from "react";
import { useSelector } from "react-redux";
import {
  neck,
  shoulder,
  chest,
  arm,
  foreArm,
  wrist,
  waist,
  hip,
  thigh,
  calve,
} from "../../data";
import SelectInput from "../CommonComponents/SelectInput";
import SelectInputSecondary from "../CommonComponents/SelectInputSecondary";
import InputPrimary from "../CommonComponents/InputPrimary";

const BodyFatInfoComponent = ({ gender }) => {

  const user = useSelector((state) => state.user);

  return (
    <div
      className={`card ${gender === "female"
        ? `red-card`
        : `blue-card`
        }
      `}
    >
      {gender === "male" ? (
        <>
          <form className="flex flex-row items-center flex-1 h-full -mt-4 text-xs md:text-2xl">
            <div className="flex w-full h-full gap-1 px-2">
              <div className="m-auto">
                <InputPrimary label="Neck" name="neck" reduxName='measurements' type="number" />
                <InputPrimary label="Shoulder" name="shoulder" reduxName='measurements' type="number" />
                <InputPrimary label="Chest" name="chest" reduxName='measurements' type="number" />
                <InputPrimary label="Arm" name="arm" reduxName='measurements' type="number" />
                <InputPrimary label="Fore Arm" name="forearm" reduxName='measurements' type="number" />
                {/* <SelectInput options={neck} label="Neck" name="neck" reduxName='measurements' /> */}
                {/* <SelectInput options={shoulder} label="Shoulder" name="shoulder" reduxName='measurements' />
                <SelectInput options={chest} label="Chest" name="chest" reduxName='measurements' />
                <SelectInput options={arm} label="Arm" name="arm" reduxName='measurements' />
                <SelectInput options={foreArm} label="Fore Arm" name="forearm" reduxName='measurements' /> */}
              </div>
              <div className="m-auto">
                <InputPrimary label="Wrist" name="wrist" reduxName='measurements' type="number" />
                <InputPrimary label="Waist" name="waist" reduxName='measurements' type="number" />
                <InputPrimary label="Hip" name="hip" reduxName='measurements' type="number" />
                <InputPrimary label="Thigh" name="thigh" reduxName='measurements' type="number" />
                <InputPrimary label="Calve" name="calve" reduxName='measurements' type="number" />
                {/* <SelectInput options={wrist} label="Wrist" name="wrist" reduxName='measurements' />
                <SelectInput options={waist} label="Waist" name="waist" reduxName='measurements' />
                <SelectInput options={hip} label="Hip" name="hip" reduxName='measurements' />
                <SelectInput options={thigh} label="Thigh" name="thigh" reduxName='measurements' />
                <SelectInput options={calve} label="Calve" name="calve" reduxName='measurements' /> */}
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
          <p className="text-xs font-semibold">
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
