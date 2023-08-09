import React, { useEffect, useState } from 'react'
import Select from 'react-select';


const SearchDropdown = ({ selectedOption, setSelectedOption, options }) => {

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    return (
        <div className="w-64">
            <Select
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
                isSearchable={true}
                placeholder="Select an option..."
            />
        </div>
    );
};

export default SearchDropdown;