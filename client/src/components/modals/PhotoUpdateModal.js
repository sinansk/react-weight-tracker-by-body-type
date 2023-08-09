import React from 'react'
import useUpdateUserInfo from '../../utils/useUpdateUserInfo'
import { createModal } from '../../utils/modalHooks'
import PhotoUploadComponent from '../MembershipComponents/PhotoUploadComponent'

const PhotoUpdateModal = (data) => {
    const updateUserInfo = useUpdateUserInfo()
    const handleUpdate = async () => {
        if (data.data?.willOpenModal) {
            createModal(data.data.willOpenModal)
        } else {
            updateUserInfo()
        }
    }

    return (
        <div className="flex flex-col w-full ">
            <PhotoUploadComponent />
            <button className="h-10 mt-5 col-span-2 font-semibold text-center grid content-center bg-pink-700 px-1 py-2.5 text-white hover:bg-pink-500 rounded-sm" onClick={handleUpdate} >UPDATE</button>
        </div>
    )
}

export default PhotoUpdateModal