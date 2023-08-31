import React from 'react'
import { setInput } from '../../redux/userRedux';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useMediaQuery } from '../../utils/useMediaQuery';
const SelectInput = ({ label, name, options, className, reduxName, disabled, type }) => {
    const dispatch = useDispatch();
    const inputValue = useSelector((state) => state.user.data.personalInfo[name]);
    const records = useSelector((state) => state.userRecords?.records?.[0].data?.[reduxName])
    const personalData = useSelector((state) => state.user?.data[0]?.[reduxName])
    const defaultValue = records?.[name] ?? personalData?.[name]
    console.log(defaultValue, "defaultValue")
    const handleSelectChange = (selectedOption) => {
        dispatch(setInput({ reduxName, name, value: selectedOption?.value }));
    };
    const isMobile = useMediaQuery('(max-width: 767px)'); // Örneğin, mobil genişlik için bir sorgu
    const mappedOptions = options.map((option) => ({
        value: option.value ?? option,
        label: option.status ? option.status : option.toString(),
    }));

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            height: isMobile && "28px",
            minHeight: isMobile && "28px",
            padding: !isMobile ? '0 0 0 16px' : '0 6px',
        }),
        option: (provided, state) => ({
            ...provided,
            color: 'black'
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
                type={type}
                isDisabled={disabled}
                required
                className={`${className} border-zinc-400 w-full max-w-full`}
                classNamePrefix="react-select"
                options={mappedOptions}
                defaultValue={mappedOptions.find((option) => option.value === defaultValue)}
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