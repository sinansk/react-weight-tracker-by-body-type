import React from 'react'
import { setInput, userInfoSelector } from '../../redux/userRedux';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useMediaQuery } from '../../utils/useMediaQuery';
const SelectInput = ({ label, name, options, className }) => {
    const dispatch = useDispatch();
    const selectedValue = useSelector((state) => userInfoSelector(state)[name]);
    console.log(selectedValue, "selectedValue")
    const handleSelectChange = (selectedOption) => {
        dispatch(setInput({ name, value: selectedOption?.value }));
    };
    const isMobile = useMediaQuery('(max-width: 767px)'); // Örneğin, mobil genişlik için bir sorgu
    const mappedOptions = options.map((option) => ({
        value: option.value ?? option,
        label: option.status ? option.status : option.toString(),
    }));

    const customStyles = {
        control: base => ({
            ...base,
            height: isMobile && "28px",
            minHeight: isMobile && "28px",
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            height: isMobile && '28px',
            padding: isMobile && '0 6px'
        }),

        input: (provided, state) => ({
            ...provided,
            margin: isMobile && '0px',
        }),
        indicatorSeparator: state => ({
            display: isMobile && 'none',
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: isMobile && '28px',
        }),
    };
    return (
        <>
            <label htmlFor={name} >{label}</label>
            <Select
                className={`  border-zinc-400 w-full max-w-full`}
                classNamePrefix="react-select"
                options={mappedOptions}
                value={mappedOptions.find((option) => option.value === selectedValue)}
                onChange={handleSelectChange}
                isSearchable={true}
                placeholder={label}
                NoOptionsMessage={() => 'No options'}
                styles={customStyles}
            />
        </>
    );
};

export default SelectInput