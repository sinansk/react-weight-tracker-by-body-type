import { useState, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef((props, ref) => {
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

    if (!isOpen) return null;
    return createPortal(
        <>
            <div
                onClick={close}
                className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900 cursor-pointer opacity-80"
            />
            <div
                className={`${props.styleProps} fixed sm:no-scrollbar overflow-y-scroll overflow-visible sm:overflow-scroll top-12 right-12 left-12 bottom-12 w-[80vw] z-50 max-h-[80vh]  rounded-md border-[0.5px] bg-white dark:bg-gray-700 dark:text-slate-200 border-gray-400 shadow-lg m-auto`}
            >
                <button
                    onClick={close}
                    className="flex btn rounded-sm ml-auto z-50 px-2.5 py-1 border-[1px] border-orange-400 dark:border-cyan-400 text-white bg-orange-500/90 dark:bg-cyan-500/90 dark:hover:bg-cyan-500/80 hover:bg-orange-500/80 border-orange-500-70 hover:text-white fixed top-0 right-0 sm:sticky sm:top-0 sm:-right-3"
                >
                    X
                </button>
                <div className="grid w-full h-full" >{props.children}</div>
            </div>
        </>,
        document.getElementById("modal")
    );
});

export default Modal;