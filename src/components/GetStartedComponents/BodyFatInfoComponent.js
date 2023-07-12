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
import SelectInput from "../SelectInput";

const BodyFatInfoComponent = ({ gender }) => {

  const user = useSelector((state) => state.user);

  return (
    <div
      className={`h-72 md:h-72 lg:h-96 lg:min-h-96 lg:w-1/2 lg:min-w-1/2 p-4 mx-4 mb-2 lg:mb-0 flex flex-col items-center 1 border-2 rounded-xl ${gender === "female"
        ? `border-rose-500 text-rose-500 bg-rose-50`
        : `border-cyan-500 text-cyan-500 bg-cyan-50`
        } `}
    >
      {gender === "male" ? (
        <>
          <form className="flex flex-row items-center flex-1 h-full md:text-2xl">
            <div className="flex w-full h-full gap-1 px-2">
              <div className="w-1/2">
                <SelectInput options={neck} label="Neck" name="neck" />
                <SelectInput options={shoulder} label="Shoulder" name="shoulder" />
                <SelectInput options={chest} label="Chest" name="chest" />
                <SelectInput options={arm} label="Arm" name="arm" />
                <SelectInput options={foreArm} label="Fore Arm" name="forearm" />
              </div>
              <div className="w-1/2">
                <SelectInput options={wrist} label="Wrist" name="wrist" />
                <SelectInput options={waist} label="Waist" name="waist" />
                <SelectInput options={hip} label="Hip" name="hip" />
                <SelectInput options={thigh} label="Thigh" name="thigh" />
                <SelectInput options={calve} label="Calve" name="calve" />
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
          <p className="lg:text-sm">
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
