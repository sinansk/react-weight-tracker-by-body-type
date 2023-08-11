import React from 'react';
import { formatInputValue } from '../../utils/formatInputValue';

const InputWithUnit = ({ name, value, unit, onChange, onFocus, onBlur }) => {
    const handleInputChange = (e) => {
        const { value } = e.target;
        const trimmedValue = formatInputValue(value, unit);
        onChange(name, trimmedValue);
    };

    return (
        <div className="flex items-center">
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-pink-500"
            />
            <span className="ml-1">{unit}</span>
        </div>
    );
};

export default InputWithUnit;