import React from 'react'
import EditButton from './EditButton'
import { createModal } from '../utils/modalHooks'

const MeasurementsCard = ({ title, data, isEdiTable }) => {

    const handleEditClick = () => {
        createModal("MeasurementsModal", {
            willOpenModal: true
        })
    }

    const measurements = Object.keys(data).filter((key) =>
        ["arm", "calve", "chest", "forearm", "wrist", "hip", "neck", "shoulder", "thigh", "waist"].includes(key)
    ).sort()

    return (
        <div className="items-center justify-center flex-1 text-center">
            <div className="flex items-center justify-center text-center">
                <h2 className="font-bold">{title}</h2>
                {isEdiTable &&
                    <EditButton styleProps={`ml-1 absolute right-1 top-1`} onClick={handleEditClick} size={20} />
                }
            </div>
            {data &&
                <ul className="grid mt-4 uppercase">
                    {measurements?.map((key) => (
                        <li key={key}>
                            <span className='font-semibold text-cyan-600'>{key}: </span>
                            <span className=''>{data[key] + ` cm`}</span>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default MeasurementsCard