import React from 'react'
import Select from 'react-select';

const SearchDropdown = ({ selectedOption, setSelectedOption, options, className, ...props }) => {

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    return (
        <div className={`${className} z-40 w-64 overflow-visible`} >
            <Select
                {...props}
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
                isSearchable={true}
                placeholder="Select an option..."
            />
        </div >
    );
};

export default SearchDropdown;