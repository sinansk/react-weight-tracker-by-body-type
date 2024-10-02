import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AiFillDelete, AiFillCopy, AiFillCheckSquare } from "react-icons/ai";
import useOutSideClick from "../../utils/useOutsideClick";
const ContextMenu = ({ isOpen, x, y, onClose, buttons }) => {
  const [contextMenuPos, setContextMenuPos] = useState({ top: 0, left: 0 });
  const contextMenuRef = useRef(null);
  useEffect(() => {
    const contextMenuWidth = contextMenuRef.current?.offsetWidth || 0;
    const contextMenuHeight = contextMenuRef.current?.offsetHeight || 0;

    const maxPosX = window.innerWidth - contextMenuWidth;
    const maxPosY = window.innerHeight - contextMenuHeight;

    const adjustedPosX = Math.min(x, maxPosX);
    const adjustedPosY = Math.min(y, maxPosY);
    // Check if context menu is too close to the right edge
    if (window.innerWidth - x < contextMenuWidth) {
      setContextMenuPos({ top: adjustedPosY, left: x - contextMenuWidth });
    }
    // Check if context menu is too close to the bottom edge
    else if (window.innerHeight - y < contextMenuHeight) {
      setContextMenuPos({ top: y - contextMenuHeight, left: adjustedPosX });
    }
    // Use the regular adjusted positions if none of the above conditions are met
    else {
      setContextMenuPos({ top: adjustedPosY, left: adjustedPosX });
    }
  }, [x, y]);
  // const contextMenuWidth = contextMenuRef.current?.offsetWidth || 0;
  // const contextMenuHeight = contextMenuRef.current?.offsetHeight || 0;

  // const maxPosX = window.innerWidth - contextMenuWidth;
  // const maxPosY = window.innerHeight - contextMenuHeight;

  // const adjustedPosX = Math.min(x, maxPosX);
  // const adjustedPosY = Math.min(y, maxPosY);
  // setContextMenuPos({ top: adjustedPosY, left: adjustedPosX });
  const handleItemClick = (button) => {
    if (button.disabled) return;
    button.onClick();
    onClose();
  };
  useOutSideClick(contextMenuRef, onClose);
  if (!isOpen) return null;

  return (
    <div
      ref={contextMenuRef}
      className="absolute z-50 bg-white border rounded-md shadow min-w-max text-slate-700"
      style={{ top: y, left: x }}
    >
      <div className="py-1">
        {buttons.map((button, index) => (
          <button
            disabled={button.disabled}
            key={index}
            onClick={() => handleItemClick(button)}
            className={
              button.disabled
                ? "text-gray-300 flex items-center justify-start w-full gap-2 px-4 py-2 text-left hover:bg-gray-200"
                : "flex items-center justify-start w-full gap-2 px-4 py-2 text-left text-slate-700 hover:bg-gray-200"
            }
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
