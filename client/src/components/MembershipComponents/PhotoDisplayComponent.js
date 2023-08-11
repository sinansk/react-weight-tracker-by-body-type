import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEye } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { createModal } from '../../utils/modalHooks';
import { deletePhoto } from '../../firebase';
import { deletePhotoRedux } from '../../redux/userRecords';

const PhotoDisplayComponent = ({ className, isEditable, item }) => {
    const [photo, setPhoto] = useState(item?.data?.photo?.url);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        setPhoto(item.data?.photo?.url);
    }, [item.data?.photo?.url]);

    const handleDelete = () => {
        deletePhoto(currentUser.uid, item.data?.photo?.id, item?.id);
        dispatch(deletePhotoRedux(item.data?.photo?.id));
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
                !isEditable && (
                    <div className=''>
                        <img src={require("../../assets/profile.png")} className="w-40 h-40 mx-auto my-4" alt="body" />
                        <p className="text-lg font-bold">CLICK TO UPLOAD A PHOTO</p>
                    </div>
                )
            )}
        </div>
    );
};

export default PhotoDisplayComponent;
