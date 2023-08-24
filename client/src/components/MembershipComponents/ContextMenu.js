import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { AiFillDelete, AiFillCopy, AiFillCheckSquare } from 'react-icons/ai'
import useOutSideClick from '../../utils/useOutsideClick';
const ContextMenu = ({ isOpen, x, y, onClose, buttons }) => {

    const contextMenuRef = useRef(null);
    useOutSideClick(contextMenuRef, onClose);
    if (!isOpen) return null;

    return (
        <div ref={contextMenuRef} className="absolute z-50 bg-white border rounded-md shadow min-w-max text-slate-700" style={{ top: y, left: x }}>
            <div className="py-1">
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        className="flex items-center justify-start w-full gap-2 px-4 py-2 text-left hover:bg-gray-200"
                        onClick={() => {
                            button.onClick();
                            onClose();
                        }}
                    >
                        {button.icon}
                        {button.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ContextMenu;