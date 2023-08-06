import React, { useEffect, useState } from 'react'
import Select from 'react-select';


const SearchDropdown = ({ selectedOption, setSelectedOption, data }) => {

    // const [selectedOption, setSelectedOption] = useState(null);
    console.log(data, "data")
    // const options = [
    //     { value: 'option1', label: 'Option 1' },
    //     { value: 'option2', label: 'Option 2' },
    //     { value: 'option3', label: 'Option 3' },
    //     { value: 'option4', label: 'Option 4' },
    //     { value: 'option5', label: 'Option 5' },
    //     // Diğer seçenekleri buraya ekleyebilirsiniz
    // ];
    const options = data.map((food) => ({
        value: food.food,
        label: food.food?.brand_name + " " + food.food.food_name,
    }));


    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        // Seçilen option değerini üst bileşene iletiyoruz
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