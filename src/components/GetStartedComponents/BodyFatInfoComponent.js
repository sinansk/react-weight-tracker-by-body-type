import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNeck,
  setWaist,
  setHip,
  setThigh,
  setChest,
  setArm,
  setForeArm,
  setWrist,
  setCalve,
  setShoulder,
} from "../../redux/userRedux";
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
import { useNavigate } from "react-router-dom";
import SelectInput from "../SelectInput";

const BodyFatInfoComponent = ({ gender }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const personalInfo = user.personalInfo;
  const currentUser = useSelector((state) => state.user.currentUser);
  const handleGender = () => {
    // navigate("/idealweight", { replace: true });
  };
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
                <SelectInput options={foreArm} label="Fore Arm" name="foreArm" />
              </div>
              <div className="w-1/2">
                <SelectInput options={wrist} label="Wrist" name="wrist" />
                <SelectInput options={waist} label="Waist" name="waist" />
                <SelectInput options={hip} label="Hip" name="hip" />
                <SelectInput options={thigh} label="Thigh" name="thigh" />
                <SelectInput options={calve} label="Calve" name="calve" />
              </div>


              {/* <label htmlFor="neckInput" className="-mb-1">
                Neck
              </label>
              <select
                className="w-full mr-5 text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
                id="neckInput"
                value={measurements.neck ? measurements.neck : 34}
                onChange={(e) => {
                  dispatch(setNeck(e.target.value));
                }}
                onBlur={(e) => {
                  dispatch(setNeck(e.target.value));
                }}
              >
                {neck.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <label htmlFor="shoulderInput" className="-mb-1">
                Shoulder
              </label>
              <select
                className="w-full mr-5 text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
                id="shoulderInput"
                value={
                  measurements.shoulder ? measurements.shoulder : 110
                }
                onChange={(e) => {
                  dispatch(setShoulder(e.target.value));
                }}
                onBlur={(e) => {
                  dispatch(setShoulder(e.target.value));
                }}
              >
                {shoulder.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <label htmlFor="chestInput" className="-mb-1">
                Chest
              </label>
              <select
                className="w-full mr-5 text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
                id="chestInput"
                value={measurements.chest ? measurements.chest : 95}
                onChange={(e) => {
                  dispatch(setChest(e.target.value));
                }}
                onBlur={(e) => {
                  dispatch(setChest(e.target.value));
                }}
              >
                {chest.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <label htmlFor="armInput" className="-mb-1">
                Arm
              </label>
              <select
                className="w-full mr-5 text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
                id="armInput"
                value={measurements.arm ? measurements.arm : 30}
                onChange={(e) => {
                  dispatch(setArm(e.target.value));
                }}
                onBlur={(e) => {
                  dispatch(setArm(e.target.value));
                }}
              >
                {arm.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <label htmlFor="foreArmInput" className="-mb-1">
                Forearm
              </label>
              <select
                className="w-full mr-5 text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
                id="foreArmInput"
                value={measurements.foreArm ? measurements.foreArm : 24}
                onChange={(e) => {
                  dispatch(setForeArm(e.target.value));
                }}
                onBlur={(e) => {
                  dispatch(setForeArm(e.target.value));
                }}
              >
                {foreArm.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full h-full px-2 justify-evenly">
              <label htmlFor="wristInput" className="-mb-1">
                Wrist
              </label>
              <select
                className="w-full mr-5 text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
                id="wristInput"
                value={measurements.wrist ? measurements.wrist : 15}
                onChange={(e) => {
                  dispatch(setWrist(e.target.value));
                }}
                onBlur={(e) => {
                  dispatch(setWrist(e.target.value));
                }}
              >
                {wrist.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <label htmlFor="waistInput" className="-mb-1">
                Waist
              </label>
              <select
                className="w-full mr-5 text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
                id="waistInput"
                value={measurements.waist ? measurements.waist : 70}
                onChange={(e) => {
                  dispatch(setWaist(e.target.value));
                }}
                onBlur={(e) => {
                  dispatch(setWaist(e.target.value));
                }}
              >
                {waist.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <label htmlFor="hipInput" className="-mb-1">
                Hip
              </label>
              <select
                className="w-full mr-5 text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
                id="hipInput"
                value={measurements.hip ? measurements.hip : 90}
                onChange={(e) => {
                  dispatch(setHip(e.target.value));
                }}
                onBlur={(e) => {
                  dispatch(setHip(e.target.value));
                }}
              >
                {hip.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <label htmlFor="thighInput" className="-mb-1">
                Thigh
              </label>
              <select
                className="w-full mr-5 text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
                id="thighInput"
                value={measurements.thigh ? measurements.thigh : 50}
                onChange={(e) => {
                  dispatch(setThigh(e.target.value));
                }}
                onBlur={(e) => {
                  dispatch(setThigh(e.target.value));
                }}
              >
                {thigh.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <label htmlFor="calveInput" className="-mb-1">
                Calve
              </label>
              <select
                className="w-full mr-5 text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
                id="calveInput"
                value={measurements.calve ? measurements.calve : 30}
                onChange={(e) => {
                  dispatch(setCalve(e.target.value));
                }}
                onBlur={(e) => {
                  dispatch(setCalve(e.target.value));
                }}
              >
                {calve.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select> */}
            </div>
          </form>
        </>
      ) : (
        <span className="flex flex-col items-center h-full">
          <h2 className="font-semibold xl:text-2xl">SET YOUR MEASUREMENTS</h2>
          <img
            className="md:my-4 h-2/5"
            src={require(`../../assets/body-${user.personalInfo.gender}.png`)}
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
