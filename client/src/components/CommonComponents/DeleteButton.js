import React from 'react';
import { AiFillDelete } from "react-icons/ai"

const DeleteButton = ({ onClick, size, className }) => {
    return (
        <button onClick={onClick} className='flex items-center justify-center'>
            <AiFillDelete title="Delete" aria-label="Delete" size={size} className={`${className} text-gray-200 hover:text-teal-400`} />
        </button>
    );
};

export default DeleteButton;