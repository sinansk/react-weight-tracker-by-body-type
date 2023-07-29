import React from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

const CollapseButton = ({ onClick, isExpanded, size }) => {
    return (
        <button onClick={onClick} className="text-cyan-700">
            {isExpanded ? <RiArrowUpSFill title="Collapse" aria-label="Collapse" size={size} /> : <RiArrowDownSFill title="Expand" aria-label="Expand" size={size} />}
        </button>
    );
};

export default CollapseButton;