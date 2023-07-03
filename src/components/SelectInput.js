import React from 'react'
import { setInput, userInfoSelector } from '../redux/userRedux';
import { useDispatch, useSelector } from 'react-redux';


const SelectInput = (props) => {
    console.log(props)
    const dispatch = useDispatch();
    const selectedValue = useSelector(
        (state) => userInfoSelector(state)[props.name]
    );
    console.log(selectedValue)
    return (
        <>
            <label htmlFor={props.name} className="-mb-1">
                {props.label}
            </label>
            <select
                className="w-full text-center bg-white border-2 rounded-lg border-slate-400 outline-slate-500"
                id={props.name}
                value={selectedValue ? selectedValue : props.options[0].value ?? props.options[0]}
                onChange={(e) => dispatch(setInput({ name: props.name, value: e.target.value }))}
                onBlur={(e) => dispatch(setInput({ name: props.name, value: e.target.value }))}
            >
                {props.options?.map((option, index) => (
                    <option key={index} value={option.value ?? option}>
                        {option.status ? option.status : option.toString()}
                    </option>
                ))}
            </select>
        </>
    )
}

export default SelectInput