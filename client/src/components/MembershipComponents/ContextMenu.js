import React from 'react';
import { useSelector } from 'react-redux';

const ContextMenu = ({ isOpen, x, y, onClose, onCopyFromDate, onCopyToDate, contextMenuDate }) => {


    if (!isOpen) return null;
    console.log(contextMenuDate, "contextMenuDate")

    return (
        <div className="absolute z-50 bg-white border rounded shadow text-slate-700" style={{ top: y, left: x }}>
            <div className="py-1">
                <button className="block w-full px-4 py-2 text-left hover:bg-gray-200" onClick={onCopyFromDate}>
                    Copy from date
                </button>
                <button className="block w-full px-4 py-2 text-left hover:bg-gray-200" onClick={onCopyToDate}>
                    Copy to date
                </button>
            </div>
        </div>
    );
};

export default ContextMenu;