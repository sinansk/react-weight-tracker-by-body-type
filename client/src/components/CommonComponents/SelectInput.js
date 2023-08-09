import React from 'react'
import { setInput, userInfoSelector } from '../../redux/userRedux';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
const SelectInput = ({ label, name, options, className }) => {
    const dispatch = useDispatch();
    const selectedValue = useSelector((state) => userInfoSelector(state)[name]);

    const handleSelectChange = (selectedOption) => {
        dispatch(setInput({ name, value: selectedOption?.value }));
    };

    const mappedOptions = options.map((option) => ({
        value: option.value ?? option,
        label: option.status ? option.status : option.toString(),
    }));

    return (
        <div className={`${className} w-48 `} >
            <label htmlFor={name} >{label}</label>
            <Select
                className={``}
                options={mappedOptions}
                value={mappedOptions.find((option) => option.value === selectedValue)}
                onChange={handleSelectChange}
                isSearchable={true}
                placeholder={label}
            />
        </div >
    );
};

export default SelectInput