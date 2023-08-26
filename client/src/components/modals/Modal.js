import React from 'react'
import modalData from './modalData';
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
                className={`${props.styleProps} fixed no-scrollbar overflow-y-scroll  overflow-scroll top-4 right-4 left-4 bottom-4 lg:top-12 lg:right-12 lg:left-12 lg:bottom-12 z-50 sm:w-fit lg:w-fit h-fit max-h-full rounded-md border-[0.5px] bg-white dark:bg-gray-700 dark:text-slate-200 border-gray-400 shadow-lg m-auto`}
            >
                <button
                    onClick={() => destroyModal()}
                    className="flex btn rounded-sm ml-auto z-50 px-2.5 py-1 border-[1px] border-teal-700 dark:border-cyan-400 text-white bg-teal-700/90 dark:bg-cyan-500/90 dark:hover:bg-cyan-500/80 hover:bg-teal-500/80 border-orange-500-70 hover:text-white fixed top-0 right-0 sm:top-5 sm:right-5"
                >
                    X
                </button>
                <div className="grid max-w-full " >{modals?.map(modal => {
                    const currentModal = modalData.find(m => m.name === modal.name)
                    return <div className='hidden transition-all-900 lg:max-h-screen last:block'>
                        <currentModal.element data={modal.data} />
                    </div>
                })}</div>
            </div>
        </>,
        document.getElementById("modal")
    );
});

export default Modal;

