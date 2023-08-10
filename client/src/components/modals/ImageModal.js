import React from 'react'

const ImageModal = ({ className, data }) => {
    console.log(data, "data")
    return (
        <div className=''>
            <img className={`max-w-4/5 lg:max-h-[800px] `} src={data?.photo} alt="test" />
        </div>
    )
}

export default ImageModal