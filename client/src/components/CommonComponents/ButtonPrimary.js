import React from 'react'
import LoadingSpinner from './LoadingSpinner'

const ButtonPrimary = ({ type, onClick, loading, children, className, disabled = false }) => {

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={`${className} font-semibold relative flex justify-center items-center h-10 px-8 py-3 overflow-hidden text-white bg-pink-500 rounded-lg hover:bg-pink-400 focus:bg-pink-400 group active:bg-pink-400 focus:outline-none focus:ring`}>
            {loading ? <LoadingSpinner className="text-white" /> : children}
        </button>
    )
}

export default ButtonPrimary