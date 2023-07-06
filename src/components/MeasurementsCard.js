import React, { useRef } from 'react'
import EditButton from './EditButton'
import Modal from './Modal.js'

const MeasurementsCard = ({ title, data, isEdiTable }) => {
    const handleEditClick = () => {
        modalRef.current.openModal()
    }
    const modalRef = useRef();
    ///TEST//
    return (
        <div className="items-center justify-center flex-1 text-center">
            <div className="flex items-center justify-center text-center">
                <h2 className="font-bold">{title}</h2>
                {isEdiTable &&
                    <>
                        <EditButton styleProps={`ml-1 `} onClick={handleEditClick} />
                        <Modal ref={modalRef}>
                            <p>TEST</p>
                        </Modal>
                    </>
                }
            </div>
            {data &&
                <ul className="grid">
                    {data
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