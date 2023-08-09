import React from 'react'

const ConfirmationModal = (data) => {
    const title = data.data?.title
    const handleConfirm = () => { }
    const handleDecline = () => { }
    return (
        <div className="flex flex-col items-center justify-center w-30">
            <h2>{title}</h2>
            <div className="flex justify-center gap-5 mx-auto">
                <button onClick={handleConfirm} className="px-4 py-3 mt-6 font-semibold text-white bg-pink-500 rounded-lg hover:bg-pink-400 focus:bg-pink-400">YES</button>
                <button onClick={handleDecline} className="px-4 py-3 mt-6 font-semibold text-white bg-pink-500 rounded-lg hover:bg-pink-400 focus:bg-pink-400">NO</button>
            </div>
        </div>
    )
}

export default ConfirmationModal