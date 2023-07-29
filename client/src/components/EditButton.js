import React from 'react'
import { RiEditBoxLine } from "react-icons/ri"

const EditButton = (props) => {

    return (
        <button onClick={props.onClick} className={` ${props.styleProps}`}>
            <RiEditBoxLine title="Edit" aria-label="Edit" size={props.size} />
        </button>
    );
};


export default EditButton