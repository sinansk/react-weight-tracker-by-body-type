import React from 'react'

const ImageModal = ({ className, data }) => {


    return (
        <div className=''>
            <img className={`max-w-4/5 lg:max-h-[800px] relative`} src={data?.photo} alt="test" />
            {data.item && (
                <div className='absolute bottom-0 left-0 right-0 rounded-md bg-gray-50 bg-opacity-10'>
                    <div className='flex items-center justify-center w-full gap-5 mx-auto ' >
                        <p className='text-xs font-semibold text-gray-200 sm:text-sm'>Date: {data?.item?.data?.date}</p>
                        <p className='text-xs font-semibold text-gray-200 sm:text-sm'>Weight: {data?.item?.data?.weight}</p>
                        <p className='text-xs font-semibold text-gray-200 sm:text-sm'>Body Fat: {data?.item?.data?.bodyFat}</p>
                    </div>
                    <div className='grid grid-cols-5 cols-auto'>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <p className='text-xs font-semibold text-gray-200 sm:text-sm'>Neck: {data?.item?.data?.neck}</p>
                            <p className='text-xs font-semibold text-gray-200 sm:text-sm'>Shoulder: {data?.item?.data?.shoulder}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <p className='text-xs font-semibold text-gray-200 sm:text-sm'>Chest: {data?.item?.data?.chest}</p>
                            <p className='text-xs font-semibold text-gray-200 sm:text-sm'>Waist: {data?.item?.data?.waist}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <p className='text-xs font-semibold text-gray-200 sm:text-sm'>Hip: {data?.item?.data?.hip}</p>
                            <p className='text-xs font-semibold text-gray-200 sm:text-sm'>Thigh: {data?.item?.data?.thigh}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <p className='text-xs font-semibold text-gray-200 sm:text-sm'>Calve: {data?.item?.data?.calve}</p>
                            <p className='text-xs font-semibold text-gray-200 sm:text-sm'>Arm: {data?.item?.data?.arm}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <p className='text-xs font-semibold text-gray-200 sm:text-sm'>Forearm: {data?.item?.data?.foreArm}</p>
                            <p className='text-xs font-semibold text-gray-200 sm:text-sm'>Wrist: {data?.item?.data?.wrist}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageModal