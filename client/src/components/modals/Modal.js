import React from 'react'
import modalData from '../../modalData'
import { destroyModal, useModals } from '../../utils/modalHooks'
import { createPortal } from 'react-dom';
import { useState, forwardRef, useImperativeHandle } from "react";

const Modal = forwardRef((props, ref) => {
    const modals = useModals()
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            openModal: () => open(),
            closeModal: () => close(),
        };
    });
    const open = () => {
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
    };


    // if (!isOpen) return null;
    if (modals.length === 0) return null

    return createPortal(
        <>
            <div
                onClick={() => destroyModal()}
                className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900 cursor-pointer opacity-90"
            />
            <div
                className={`${props.styleProps} fixed sm:no-scrollbar overflow-y-scroll overflow-visible sm:overflow-scroll top-12 right-12 left-12 bottom-12  z-50 w-fit h-fit rounded-md border-[0.5px] bg-white dark:bg-gray-700 dark:text-slate-200 border-gray-400 shadow-lg m-auto`}
            >
                <button
                    onClick={() => destroyModal()}
                    className="flex btn rounded-sm ml-auto z-50 px-2.5 py-1 border-[1px] border-indigo-700 dark:border-cyan-400 text-white bg-indigo-700/90 dark:bg-cyan-500/90 dark:hover:bg-cyan-500/80 hover:bg-indigo-500/80 border-orange-500-70 hover:text-white fixed top-0 right-0 sm:sticky sm:top-0 sm:-right-3"
                >
                    X
                </button>
                <div className="grid w-full h-full p-10" >{modals?.map(modal => {
                    const currentModal = modalData.find(m => m.name === modal.name)
                    return <div className='hidden last:block'>
                        <currentModal.element data={modal.data} />
                    </div>
                })}</div>
            </div>
        </>,
        document.getElementById("modal")
    );
});

export default Modal;

