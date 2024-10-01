import React from 'react'
import LoadingSpinner from './Loaders/LoadingSpinner'

const ButtonPrimary = ({ type, onClick, loading, children, className, disabled = false }) => {

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={`${className} font-semibold relative flex justify-center items-center h-10 px-8 py-3 overflow-hidden text-white bg-teal-500 rounded-lg hover:bg-teal-400 focus:bg-teal-400 group active:bg-teal-400 focus:outline-none focus:ring`}>
            {loading ? <LoadingSpinner className="text-white" /> : children}
        </button>
    )
}

export default ButtonPrimary