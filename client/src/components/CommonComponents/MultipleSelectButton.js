import React, { useState } from 'react'
import { BiSelectMultiple, BiSolidSelectMultiple } from "react-icons/bi";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";

const MultipleSelectButton = ({ handleMultipleSelectButton, className, size }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        setIsSelected(!isSelected);
        handleMultipleSelectButton()
    };

    return (
        <button onClick={handleClick} className={`${className} flex items-center`}>
            {isSelected ? <BiSolidSelectMultiple size={size} /> : <RiCheckboxMultipleBlankLine size={size} />}
        </button>
    );
};

export default MultipleSelectButton