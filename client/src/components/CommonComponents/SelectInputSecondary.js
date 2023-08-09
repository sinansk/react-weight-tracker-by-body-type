import React from 'react'
import { setInput, userInfoSelector } from '../../redux/userRedux';
import { useDispatch, useSelector } from 'react-redux';

const SelectInputSecondary = ({ label, name, options, className }) => {
    const dispatch = useDispatch();
    const selectedValue = useSelector(
        (state) => userInfoSelector(state)[name]
    );

    return (
        <div className={`${className}`}>
            <label htmlFor={name} className="-mb-1">
                {label}
            </label>
            <select
                className="w-full text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
                id={name}
                value={selectedValue ? selectedValue : options[0].value ?? options[0]}
                onChange={(e) => dispatch(setInput({ name: name, value: e.target.value }))}
                onBlur={(e) => dispatch(setInput({ name: name, value: e.target.value }))}
            >
                {options?.map((option, index) => (
                    <option key={index} value={option.value ?? option}>
                        {option.status ? option.status : option.toString()}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectInputSecondary