import React from 'react';
import { AiFillDelete } from "react-icons/ai"

const DeleteButton = ({ onClick, size }) => {
    return (
        <button onClick={onClick}>
            <AiFillDelete title="Delete" aria-label="Delete" size={size} className="text-slate-800 hover:text-slate-600" />
        </button>
    );
};

export default DeleteButton;