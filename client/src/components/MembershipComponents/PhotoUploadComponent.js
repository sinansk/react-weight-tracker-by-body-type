import React, { useEffect, useState } from "react";
import { addPhoto, deletePhoto, updateUserInfo } from "../../firebase";
import { setPhotoUrl } from "../../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";
import bodyPNG from "../../assets/body.png";
import { createModal } from "../../utils/modalHooks";
import { AiFillEye } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { deletePhotoRedux } from "../../redux/userRecords";
import toast from "react-hot-toast";

const PhotoUploadComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userRecords = useSelector((state) => state.userRecords?.records);
  const latestPhoto = userRecords?.[0].data?.photo;
  const userGender = userRecords?.[0].data?.personalInfo?.gender;
  const [photoUrl, setPhoto] = useState(latestPhoto ?? null);

  const handlePhotoUpload = async (event) => {
    event.stopPropagation();
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024;
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      try {
        const uid = user?.currentUser?.uid;
        const id = Date.now();
        const docId = userRecords?.[0].id;
        const photo = await addPhoto(uid, id, file, docId);
        setPhoto(photo);
      } catch (error) {
        console.error("Fotoğraf yüklenirken bir hata oluştu:", error);
      }
    } else {
      if (file.size > maxSize) {
        toast.error("File too large! Max 5MB.");
      } else {
        toast.error("Please upload a .jpg or .png file.");
      }
    }
  };

  const handleDeletePhoto = () => {
    // deletePhoto(user.currentUser.uid, userRecords[0]?.data?.photo?.id)
    setPhoto(null);
  };

  useEffect(() => {
    dispatch(setPhotoUrl(photoUrl));
  }, [photoUrl, dispatch]);

  return (
    <div className="w-full my-5 mb-auto text-center rounded-md">
      {/* <h2 className="font-bold">YOUR ACTUAL PHOTO</h2> */}
      <label htmlFor="photo-upload" className="cursor-pointer">
        <div>
          {photoUrl?.url ? (
            <div className="relative inline-block group">
              <img
                src={photoUrl?.url}
                className="w-56 h-48 mx-auto rounded-lg"
                alt="body"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <div className="flex items-center justify-center w-full h-full text-white bg-black rounded bg-opacity-20">
                  <button
                    type="button"
                    onClick={() =>
                      createModal("ImageModal", { photo: photoUrl?.url })
                    }
                    className="px-3 py-1 text-white rounded "
                  >
                    <AiFillEye size={30} />
                  </button>
                  <button
                    type="button"
                    onClick={handleDeletePhoto}
                    className="px-3 py-1 text-white rounded "
                  >
                    <TiDeleteOutline size={30} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="m-auto rounded-md">
              <label htmlFor="photo-upload" className="cursor-pointer">
                <img
                  src={require(`../../assets/body-${userGender}.png`)}
                  className="w-20 h-20 mx-auto my-4 rounded-md sm:w-40 sm:h-40"
                  alt="body"
                />
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/jpeg,image/png"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <p className="text-lg font-bold text-gray-200">
                  CLICK TO UPLOAD A PHOTO
                </p>
              </label>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default PhotoUploadComponent;
