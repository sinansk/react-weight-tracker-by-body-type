import React from 'react'
import modelData from '../../modelData'
import { useModals } from '../../utils/modalHooks'
import { createPortal } from 'react-dom';
const Modal = () => {
    const modals = useModals()
    console.log(modals)
    return (

        <div>

            {modals.map(modal => {
                const currentModal = modelData.find(m => m.name === modal.name)
                console.log("currentModal", currentModal)
                return <currentModal.element />
            })}

        </div>

    )
}

export default Modal