import React, { useEffect } from "react";
import { setInput } from "../../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";
import BodyPartTooltip from "./ToolTips/BodyPartToolTip";

const InputPrimary = ({ label, name, type, className, reduxName, toolTip }) => {
  const dispatch = useDispatch();
  const inputValue = useSelector((state) => state.user.data.personalInfo[name]);
  const records = useSelector(
    (state) => state.userRecords?.records?.[0].data?.[reduxName]
  );
  const personalData = useSelector((state) => state.user?.data[0]?.[reduxName]);
  const defaultValue = records?.[name] ?? personalData?.[name];

  const handleInputChange = (event) => {
    dispatch(setInput({ reduxName, name, value: event.target.value }));
  };

  return (
    <>
      <label className="text-gray-200" htmlFor={name}>
        {label}
      </label>
      <div className="relative ">
        <input
          type={type}
          id={name}
          className={`border-zinc-400  text-gray-700 w-full max-w-full sm:p-2 border-2 rounded-md sm:h-9  ${className}`}
          // value={inputValue}
          defaultValue={defaultValue}
          onChange={handleInputChange}
          placeholder={label}
        />
        {toolTip && (
          <BodyPartTooltip
            className="absolute top-0 bottom-0 flex items-center justify-center text-slate-800 right-1"
            bodyPart={name}
          />
        )}
      </div>
    </>
  );
};

export default InputPrimary;
