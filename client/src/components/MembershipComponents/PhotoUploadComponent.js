import React, { useEffect, useState } from 'react'
import { addPhoto, deletePhoto, updateUserInfo } from "../../firebase";
import { setPhotoUrl } from "../../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";
import bodyPNG from "../../assets/body.png";
import { createModal } from '../../utils/modalHooks';
import { AiFillEye } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { deletePhotoRedux } from '../../redux/userRecords';

const PhotoUploadComponent = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const latestPhoto = useSelector((state) => state.userRecords?.records[0].data?.photo)
    const [photoUrl, setPhoto] = useState(latestPhoto)
    const userRecords = useSelector((state) => state.userRecords?.records)

    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0];
        event.stopPropagation();
        if (file) {
            try {
                const uid = user?.currentUser?.uid
                const id = Date.now();
                const docId = userRecords?.[0].id
                const photo = await addPhoto(uid, id, file, docId);
                setPhoto(photo)

            } catch (error) {
                console.error("Fotoğraf yüklenirken bir hata oluştu:", error);
            }
        }
    };

    const handleDeletePhoto = () => {
        // deletePhoto(user.currentUser.uid, userRecords[0]?.data?.photo?.id)
        setPhoto(null)

    }

    useEffect(() => {
        dispatch(setPhotoUrl(photoUrl))
    }, [photoUrl, dispatch])

    return (
        <div className="w-full mb-auto text-center">
            {/* <h2 className="font-bold">YOUR ACTUAL PHOTO</h2> */}
            <label htmlFor="photo-upload" className="cursor-pointer">
                <div>
                    {photoUrl?.url ? (
                        <div className="relative inline-block group">
                            <img src={photoUrl?.url} className="w-56 h-48 mx-auto " alt="body" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                                <div className="flex items-center justify-center w-full h-full text-white bg-black rounded bg-opacity-20">
                                    <button onClick={() => createModal("ImageModal", { photo: photoUrl?.url })} className="px-3 py-1 text-white rounded "><AiFillEye size={30} /></button>
                                    <button onClick={handleDeletePhoto} className="px-3 py-1 text-white rounded "><TiDeleteOutline size={30} /></button>
                                </div>
                            </div>
                        </div>

                    ) : (
                        <div className=''>
                            <label htmlFor="photo-upload" className="cursor-pointer">
                                <img src={require("../../assets/profile.png")} className="w-40 h-40 mx-auto my-4" alt="body" />
                                <input type="file" id="photo-upload" onChange={handlePhotoUpload} className="hidden" />
                                <p className="text-lg font-bold">CLICK TO UPLOAD A PHOTO</p>
                            </label>
                        </div>
                    )}

                </div>
            </label>
        </div>
    )
}

export default PhotoUploadComponent