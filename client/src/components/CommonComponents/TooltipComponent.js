import React from "react";
import { Tooltip } from 'react-tooltip'

const TooltipComponent = ({ tooltipName, tooltipContent }) => {
    return (
        <>
            <span
                data-tooltip-content={tooltipContent}
                data-tooltip-id={tooltipName}
                className="cursor-pointer"
            >
                ?
            </span>
            <Tooltip id={tooltipName} effect="solid" place="top" className="z-50 " />
        </>
    );
};

export default TooltipComponent;