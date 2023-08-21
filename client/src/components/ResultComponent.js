import React from 'react'
import LoadingSpinner from './CommonComponents/Loaders/LoadingSpinner'

const ResultComponent = ({ children, loading, title }) => {
    return (
        <div className="h-12 mx-auto sm:w-1/2 xl:h-24">
            <div className="flex flex-col items-center justify-center mx-4 text-sm text-white border-2 border-teal-400 rounded-md xl:text-2xl bg-teal-400/60 opacity-90 xl:h-full">
                {loading ? (
                    <LoadingSpinner className="mx-auto text-white" />
                ) : (
                    !children ? (
                        <h2>{title}</h2>
                    ) : (
                        children
                    )
                )}
            </div>
        </div>
    )
}

export default ResultComponent