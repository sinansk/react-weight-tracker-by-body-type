import React from 'react';

const ItemsPerPageComponent = ({ onChange, className }) => {
    const handleChange = (event) => {
        const itemsPerPage = parseInt(event.target.value, 10);
        onChange(itemsPerPage);
    };

    return (
        <div className={`${className} flex items-center`}>
            <label htmlFor="itemsPerPage" className="mr-2">Items :</label>
            <select id="itemsPerPage" className="p-1 text-black border rounded-md" onChange={handleChange}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="60">60</option>
            </select>
        </div>
    );
};

export default ItemsPerPageComponent;