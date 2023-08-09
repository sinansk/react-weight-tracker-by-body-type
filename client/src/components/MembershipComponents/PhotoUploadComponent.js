import React from 'react'
import { addPhoto } from "../../firebase";
import { setPhotoUrl } from "../../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";
import bodyPNG from "../../assets/body.png";
const PhotoUploadComponent = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    console.log(user)
    const userRecords = useSelector((state) => state.userRecords?.records)
    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0];

        if (file) {
            try {
                // Kullanıcının UID ve ID'sini burada elde edin (örneğin, oturum açma veya kullanıcı oluşturma işlemleri)
                const uid = user.currentUser.uid // Kullanıcının UID'sini buraya yerleştirin
                const id = Date.now(); // Fotoğrafın ID'sini buraya yerleştirin
                const docId = userRecords?.[0].id // Kullanıcının Firestore'daki kaydının ID'sini buraya yerleştirin  
                // Fotoğrafı Firestore'a eklemek ve URL'yi almak için utility fonksiyonunu çağırın
                const downloadURL = await addPhoto(uid, id, file, docId);

                // İşlem başarılıysa veya URL gerekiyorsa, burada uygun işlemleri gerçekleştirin
                console.log("Fotoğraf yüklendi. İndirme URL'si:", downloadURL);

                // Seçilen fotoğrafı temizle

                dispatch(setPhotoUrl(downloadURL));
            } catch (error) {
                console.error("Fotoğraf yüklenirken bir hata oluştu:", error);
            }
        }
    };
    return (
        <div className="w-full h-full text-center">
            <h2 className="font-bold">YOUR ACTUAL PHOTO</h2>
            <label htmlFor="photo-upload" className="cursor-pointer">
                <div>
                    {userRecords[0]?.data?.photo ? (
                        <img src={userRecords[0]?.data?.photo} className="w-56 h-48 mx-auto my-4" alt="body" />
                    ) : (
                        <img src={bodyPNG} className="w-56 h-48 mx-auto my-4" alt="body" />
                    )}
                    <input type="file" id="photo-upload" onChange={handlePhotoUpload} className="hidden" />
                    <p className="text-lg font-bold">CLICK TO UPLOAD A PHOTO</p>
                </div>
            </label>
        </div>
    )
}

export default PhotoUploadComponent