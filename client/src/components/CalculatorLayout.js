import React from 'react'

const CalculatorLayout = ({ children }) => {
    return (
        <div className="flex flex-col items-center justify-center w-screen overflow-hidden lg:h-[calc(100vh-62px)]">{children}</div>
    )
}

export default CalculatorLayout