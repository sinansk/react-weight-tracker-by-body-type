import React, { useState } from 'react';
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

const SelectButton = ({ size, className, handleSelectButton }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        setIsSelected(!isSelected);
        handleSelectButton()
    };

    return (
        <button onClick={handleClick} className={`${className} flex items-center`}>
            {isSelected ? <IoIosCheckboxOutline size={size} /> : <MdOutlineCheckBoxOutlineBlank size={size} />}
        </button>
    );
};

export default SelectButton;