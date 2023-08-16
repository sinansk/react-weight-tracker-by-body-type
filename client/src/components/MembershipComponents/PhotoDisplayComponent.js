import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEye } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { createModal } from '../../utils/modalHooks';
import { addPhoto, deletePhoto, updateUserInfo } from '../../firebase';
import { updatePhotoRedux } from '../../redux/userRecords';

const PhotoDisplayComponent = ({ className, isEditable, item, willUpdateNow = false }) => {
    const [photo, setPhoto] = useState(item?.data?.photo?.url);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        setPhoto(item?.data?.photo?.url);
    }, [item?.data?.photo?.url]);

    const handleDelete = () => {
        deletePhoto(currentUser.uid, item.data?.photo?.id, item?.id);
    };
    const handlePhotoUpload = async (e) => {
        if (willUpdateNow) {

            const file = e.target.files[0];
            e.stopPropagation();
            if (file) {
                try {
                    const uid = currentUser?.uid
                    const id = Date.now();
                    const docId = item?.id
                    const photo = await addPhoto(uid, id, file, docId);
                    updateUserInfo(uid, docId, { photo: photo })
                    dispatch(updatePhotoRedux({ id: docId, photo: photo }));
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };
    return (
        <div className={`${className} relative inline-block group`}>
            {photo ? (
                <>
                    <img src={photo} alt="user" className="w-full h-full" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        <div className="flex items-center justify-center w-full h-full p-2 text-white bg-black rounded bg-opacity-20">
                            <button onClick={() => createModal("ImageModal", { photo: photo })} className="px-3 py-1 text-white rounded"><AiFillEye size={30} /></button>
                            {isEditable && (
                                <button onClick={handleDelete} className="px-3 py-1 text-white rounded"><TiDeleteOutline size={30} /></button>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                willUpdateNow && (
                    <div className=''>
                        <label htmlFor="photo-upload" className="cursor-pointer">
                            <img src={require("../../assets/profile.png")} className="w-40 h-40 mx-auto my-4" alt="body" />
                            <input type="file" id="photo-upload" onChange={handlePhotoUpload} className="hidden" />
                            <p className="text-lg font-bold">CLICK TO UPLOAD A PHOTO</p>
                        </label>
                    </div>
                )
            )}
        </div>
    );
};

export default PhotoDisplayComponent;
