import React from 'react';
import { Tooltip } from 'react-tooltip'
import { BsQuestionCircleFill } from 'react-icons/bs'
const BodyPartTooltip = ({ className, bodyPart }) => {
    const imgSource = require(`../../../assets/${bodyPart}.jpg`)
    console.log(imgSource, "imgSource")
    const content = () => {
        if (!imgSource) return null

        return (
            <div className=''>
                <img src={imgSource} alt={bodyPart} className='object-cover w-36 h-36 sm:w-96 sm:h-96' />
            </div>
        )
    }
    if (!imgSource) {
        return null
    }
    return (
        imgSource &&
        <div>
            <span className={`${className} capitalize cursor-pointer`} data-tooltip-id={bodyPart}>
                <BsQuestionCircleFill />
            </span>
            <Tooltip id={bodyPart} effect="solid" place="top" className='z-50 '>
                {content()}
            </Tooltip>
        </div>
    );
};

export default BodyPartTooltip;
