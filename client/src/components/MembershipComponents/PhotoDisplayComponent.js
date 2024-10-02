import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEye } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { createModal } from "../../utils/modalHooks";
import { addPhoto, deletePhoto, updateUserInfo } from "../../firebase";
import { updatePhotoRedux } from "../../redux/userRecords";
import toast from "react-hot-toast";

const PhotoDisplayComponent = ({
  className,
  isEditable,
  item,
  willUpdateNow = false,
}) => {
  const [photo, setPhoto] = useState(item?.data?.photo?.url);
  const currentUser = useSelector((state) => state.user.currentUser);
  const userGender = useSelector(
    (state) => state.user?.data?.personalInfo?.gender ?? "male"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setPhoto(item?.data?.photo?.url);
  }, [item?.data?.photo?.url]);

  const handleDelete = () => {
    createModal("ConfirmationModal", {
      title: "Delete Photo",
      text: "Are you sure you want to delete this photo?",
      onConfirm: () => {
        deletePhoto(currentUser.uid, item.data?.photo?.id, item?.id);
        updateUserInfo(currentUser.uid, item?.id, { photo: null });
        dispatch(updatePhotoRedux({ id: item?.id, photo: null }));
      },
    });
  };
  const handlePhotoUpload = async (e) => {
    e.stopPropagation();

    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      try {
        const uid = currentUser?.uid;
        const id = Date.now();
        const docId = item?.id;
        const photo = await addPhoto(uid, id, file, docId);
        updateUserInfo(uid, docId, { photo: photo });
        dispatch(updatePhotoRedux({ id: docId, photo: photo }));
      } catch (error) {
        console.log(error);
      }
    } else {
      if (file.size > maxSize) {
        toast.error("File too large! Max 5MB.");
      } else {
        toast.error("Please upload a .jpg or .png file.");
      }
    }
  };
  return (
    <div className={`${className} relative inline-block group `}>
      {photo ? (
        <>
          <img src={photo} alt="user" className="w-full h-full rounded-lg" />
          <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <div className="flex items-center justify-center w-full h-full p-2 text-white bg-black rounded bg-opacity-20">
              <button
                onClick={() =>
                  createModal("ImageModal", { photo: photo, item })
                }
                className="px-3 py-1 text-white rounded"
              >
                <AiFillEye size={30} />
              </button>
              {isEditable && (
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 text-white rounded"
                >
                  <TiDeleteOutline size={30} />
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        isEditable &&
        willUpdateNow && (
          <div className="w-full md:mt-10">
            <label htmlFor="photo-update" className="w-full cursor-pointer">
              <img
                src={require(`../../assets/body-${userGender}.png`)}
                className="w-full mx-auto h-28 md:my-4 md:h-40 md:w-40"
                alt="body"
              />
              <input
                type="file"
                id="photo-update"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <p className="w-full text-sm font-bold sm:text-lg">
                CLICK TO UPLOAD A PHOTO
              </p>
            </label>
          </div>
        )
      )}
    </div>
  );
};

export default PhotoDisplayComponent;
