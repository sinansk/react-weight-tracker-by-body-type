import React, { useRef } from 'react'
import EditButton from './EditButton'
import Modal from './Modal.js'
import { setInput } from '../redux/userRedux'
import { useDispatch } from "react-redux"

const MeasurementsCard = ({ title, data, isEdiTable }) => {
    const handleEditClick = () => {
        modalRef.current.openModal()
    }
    const modalRef = useRef();
    console.log("data,", data)
    const measurements = Object.keys(data).filter((key) =>
        ["arm", "calve", "chest", "forearm", "hip", "neck", "shoulder", "thigh", "waist"].includes(key)
    ).sort()
    console.log("measurements,", measurements)
    const dispatch = useDispatch()
    ///TEST//
    return (
        <div className="items-center justify-center flex-1 text-center">
            <div className="flex items-center justify-center text-center">
                <h2 className="font-bold">{title}</h2>
                {isEdiTable &&
                    <>
                        <EditButton styleProps={`ml-1 `} onClick={handleEditClick} />
                        <Modal ref={modalRef} styleProps={`w-96 max-h-fit`}>
                            <ul className="grid gap-2">
                                {measurements
                                    .map((key) => (
                                        <li key={key}>
                                            <span>{key}: </span>
                                            <input className="w-full h-10 px-4 font-thin transition-all duration-200 ease-in-out rounded-md outline-none peer bg-gray-50 drop-shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-400" type="number" value={measurements[key]} name={key} onChange={(e) => dispatch(setInput({ name: e.target.name, value: e.target.value }))} />
                                        </li>
                                    ))}
                            </ul>
                            <button className="h-10 mt-5 font-semibold text-center grid content-center bg-indigo-700 px-1 py-2.5 text-white hover:bg-indigo-500 rounded-sm" name="actualMeasurements" >UPDATE</button>
                        </Modal>
                    </>
                }
            </div>
            {data &&

                <ul className="grid">
                    {measurements
                        .map((key) => (
                            <li key={key}>
                                <span>{key}: </span>
                                <span>{data[key]}</span>
                            </li>
                        ))}
                </ul>
            }
        </div>
    )
}

export default MeasurementsCard