import React from 'react'
import { setInput } from '../../redux/userRedux';
import { useDispatch, useSelector } from 'react-redux';

const InputPrimary = ({ label, name, type, className, reduxName }) => {
    const dispatch = useDispatch();
    const inputValue = useSelector((state) => state.user.data.personalInfo[name]);
    const records = useSelector((state) => state.userRecords?.records?.[0].data?.[reduxName])
    const personalData = useSelector((state) => state.user?.data[0]?.[reduxName])
    const defaultValue = records?.[name] ?? personalData?.[name]
    console.log(defaultValue, "defaultValue");

    const handleInputChange = (event) => {
        dispatch(setInput({ reduxName, name, value: event.target.value }));
    };

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                className={`border-zinc-400 text-gray-700 w-full max-w-full sm:p-2 border-2 rounded-md sm:h-9  ${className}`}
                // value={inputValue}
                defaultValue={defaultValue ?? ""}
                onChange={handleInputChange}
                placeholder={label}
            />
        </>
    );
};

export default InputPrimary