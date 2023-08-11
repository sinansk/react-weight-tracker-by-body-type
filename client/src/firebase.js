// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { store } from "./redux/store";
import {
  login as loginHandle,
  logout as logoutHandle,
  reset,
  setData,
} from "./redux/userRedux";
import { deletePhotoRedux, deleteUserRecord } from "./redux/userRecords";
import { fetchUserInfo } from "./redux/userRecordsThunk";
import moment from "moment"
import { setDiary } from "./redux/userDiary";
import { calculateTotalNutrients } from "./utils/calculateTotalNutrients";
import { fetchCalorieRecords } from "./redux/userDiaryThunk";
import { setCustomFoods } from "./redux/customFoods";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER_IP,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // emailVerification();
    return user;
  } catch (err) {
    toast.error(err.message);
    console.log(err.message);
  }
};

export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success(
      `WE HAVE SENT A VERIFICATION MAIL TO ${auth.currentUser.email}  PLEASE CHECK`
    );
  } catch (err) {
    toast.error(err.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (user) {
      store.dispatch(loginHandle(user))
      store.dispatch(fetchUserInfo(user.uid))
      store.dispatch(fetchCalorieRecords(user.uid))
      getCustomFoods(user.uid)
    }
    return user;
  } catch (err) {
    toast.error(err.message);
    console.log(err.message);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (err) {
    toast.error(err.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // store.dispatch(loginHandle(user))
    // store.dispatch(fetchUserInfo(user.uid))
    // getUserInfo(user.uid)
  } else {
    store.dispatch(logoutHandle());
    store.dispatch(reset());
  }
});

export const addUserInfo = async (data) => {
  console.log(data, "addUserInfo")
  try {
    const uid = data.uid
    const userRef = doc(db, "users", uid);
    // Kullanıcının "userPersonalInfos" koleksiyonunu oluşturun
    const userPersonalInfoRef = collection(userRef, "userPersonalInfos");
    const result = await addDoc(userPersonalInfoRef, data);
    return result
  } catch (error) {
    toast.error(error.message)
    console.log(error)
  }
};

export const getUserInfo = async (uid) => {
  try {
    const snapshot = await getDocs(query(collection(db, "users", uid, "userPersonalInfos")));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    })).sort((a, b) => b.data.date - a.data.date);
    // store.dispatch(setData(data?.[0].data))
    return data;
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
};

export const updateUserInfo = async (uid, id, data) => {
}
export const deleteRecord = async (uid, id) => {
  console.log("uid", uid, "id:", id);
  try {
    await deleteDoc(doc(db, "users", uid, "userPersonalInfos", id));
    store.dispatch(deleteUserRecord(id)); // Redux store'u güncelle
    toast.success("Veri başarıyla silindi");
  } catch (error) {
    toast.error(error.message);
    console.log(error)
    throw new Error(error.message);
  }
};

export const addPhoto = async (uid, id, photoFile, docId) => {
  console.log("uid", uid, "id:", id, "photoFile", photoFile);
  try {


    // Firebase Storage'da fotoğrafı yüklemek ve indirme URL'sini almak için gerekli adımlar
    const storageRef = ref(storage, `users/${uid}/photos/${id}`);
    const result = await uploadBytes(storageRef, photoFile);
    console.log("result", result)
    // Veritabanına fotoğrafı eklemek için dökümanı güncelle


    // Fotoğrafın indirme URL'sini al
    const downloadURL = await getDownloadURL(storageRef);
    // await updateDoc(doc(db, "users", uid, "userPersonalInfos", docId), {
    //   photo: downloadURL, // Varsa mevcut fotoğraf alanını güncellemek için true değeri kullanabilirsiniz
    // });
    toast.success("Fotoğraf başarıyla eklendi");
    return {
      id: id,
      url: downloadURL,
    }; // Eğer URL'yi kullanmak isterseniz geri dönebilirsiniz
  } catch (error) {
    toast.error(error.message);
    console.error(error);
    throw new Error(error.message);
  }
};

export const deletePhoto = async (uid, id, docId) => {
  console.log("uid", uid, "id:", id, "docId", docId);
  try {
    const storageRef = ref(storage, `users/${uid}/photos/${id}`);
    await deleteObject(storageRef);

    await updateDoc(doc(db, "users", uid, "userPersonalInfos", docId), {
      photo: null
    })
    store.dispatch(deletePhotoRedux(docId)); // Redux store'u güncelle
    toast.success("Fotoğraf başarıyla silindi");
  } catch (error) {
    toast.error(error.message);
    console.error(error);
    throw new Error(error.message);
  }
};

// Kullanıcının fotoğrafını görüntülemek için kullanılacak fonksiyon
export const viewPhoto = async (uid, id) => {
  try {
    const storageRef = ref(storage, `users/${uid}/photos/${id}`);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error(error);
    throw new Error("Fotoğraf bulunamadı");
  }
};

export const viewAllPhotos = async (uid) => {
  try {
    const storageRef = ref(storage, `users/${uid}/photos/`);
    const fileList = await listAll(storageRef);

    const photoURLs = await Promise.all(
      fileList.items.map(async (item) => {
        const downloadURL = await getDownloadURL(item);
        return downloadURL;
      })
    );

    return photoURLs;
  } catch (error) {
    console.error(error);
    throw new Error("Fotoğraflar alınamadı");
  }
};

export const addDailyCalorie = async (data, calorieDiary, selectedDate) => {
  const uid = data.uid;
  const currentDate = moment();
  const dateString = currentDate.format('DD-MM-YYYY');
  const totalNutrient = {
    totalFat: data.food.fat,
    totalCarbs: data.food.carbs,
    totalProtein: data.food.protein,
    totalCalories: data.food.calories
  }
  console.log(data, "data")

  const food = data.food
  const newtotalNutrient = calculateTotalNutrients({ calorieDiary, selectedDate, food, operation: "add" });
  const diary = {
    ...food,
    timestamp: currentDate.toISOString(), // Store the timestamp as a string in ISO format
    uid: data.uid,
    id: Date.now()
  };

  try {
    const userRef = collection(db, "users");
    const userDocRef = doc(userRef, uid); // Reference to the user document
    const calorieRecordsRef = collection(userDocRef, "calorieRecords");
    const querySnapshot = await getDocs(query(calorieRecordsRef, where("date", "==", selectedDate)));
    if (querySnapshot.empty) {
      // If the document doesn't exist, create a new document with the current date
      await addDoc(calorieRecordsRef, { date: selectedDate, foods: [diary], totalNutrient });
    } else {
      // If the document exists, update the array field by appending the new food data
      const existingDocId = querySnapshot.docs[0].id;
      await updateDoc(doc(calorieRecordsRef, existingDocId), {
        foods: arrayUnion(diary), // Append the new diary object to the existing "foods" array
        totalNutrient: newtotalNutrient
      });
      toast.success("Food added successfully.");
    }
    // Now, let's listen for any changes to the document and perform necessary actions.
    onSnapshot(collection(userDocRef, "calorieRecords"), (snapshot) => {
      // This callback function will be triggered whenever there are changes to the document with the specified date.
      // You can handle the changes here, if needed.
      // For example, you can log the changes or dispatch an action to update your Redux store.
      console.log("Snapshot changes:", snapshot.docs.map((doc) => doc.data()));
      store.dispatch(setDiary(snapshot.docs.map((doc) => doc.data())))
    });
    return "Data added successfully.";
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};


export const deleteDailyCalorie = async (data, calorieDiary, selectedDate) => {
  console.log(data)
  const id = data.id
  const uid = data.uid;
  const dateString = data.date;
  const food = data
  const newtotalNutrient = calculateTotalNutrients({ calorieDiary, selectedDate, food, operation: "delete" });

  try {
    const userRef = collection(db, "users");
    const userDocRef = doc(userRef, uid);
    const calorieRecordsRef = collection(userDocRef, "calorieRecords");
    // Query for the document with the specified date
    const querySnapshot = await getDocs(query(calorieRecordsRef, where("date", "==", selectedDate)));
    console.log(querySnapshot)
    if (!querySnapshot.empty) {

      const docId = querySnapshot.docs[0].id;
      const docData = querySnapshot.docs[0].data();
      const updatedFoods = docData.foods.filter((food) => food.id !== id);
      if (newtotalNutrient === null) {
        await deleteDoc(doc(calorieRecordsRef, docId)) // Delete the document if the foods array is empty      
      } else {
        await updateDoc(doc(calorieRecordsRef, docId), { foods: updatedFoods, totalNutrient: newtotalNutrient },);
      }
      toast.success("Data deleted successfully.");
      return "Data deleted successfully.";
    }

    onSnapshot(collection(userDocRef, "calorieRecords"), (snapshot) => {

      console.log("Snapshot changes:", snapshot.docs.map((doc) => doc.data()));
      store.dispatch(setDiary(snapshot.docs.map((doc) => doc.data())))
    });
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getCalorieRecords = async (uid) => {
  try {
    const snapshot = await getDocs(query(collection(db, "users", uid, "calorieRecords")));
    const data = snapshot.docs.map((doc) => (doc.data()));
    return data;
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
};

export const saveCustomFood = async (data) => {
  console.log(data, "data SAVE CUSTOM FOOD")
  const currentDate = moment();
  const dateString = currentDate.format('DD-MM-YYYY');
  const food = data.food;
  const customFood = {
    ...food,
    timestamp: currentDate.toISOString(), // Store the timestamp as a string in ISO format
    uid: data.uid,
    id: Date.now(),
    food_id: (data?.food.brand_name + data?.food.food_name + data?.food.amount).replace(/\s+/g, ''),
    date: dateString, // Add the date field to the document

  };
  const uid = data.uid;

  console.log(food, uid, "food")
  try {
    console.log(customFood, "customFood")
    const userRef = collection(db, "users");
    const userDocRef = doc(userRef, uid); // Reference to the user document
    const customFoodsRef = collection(userDocRef, "customFoods");
    // Check if a food with the same ID already exists in the collection
    const querySnapshot = await getDocs(query(customFoodsRef, where("food_id", "==", customFood.food_id)));
    console.log(querySnapshot, "querySnapshot")
    if (querySnapshot.empty) {
      await addDoc(customFoodsRef, customFood);
      toast.success("Özel yiyecek başarıyla kaydedildi.");
      // A food with the same ID already exists, skip saving
    } else {
      return;
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
}

export const getCustomFoods = async (uid) => {
  try {
    const snapshot = await getDocs(query(collection(db, "users", uid, "customFoods")));
    const data = snapshot.docs.map((doc) => (doc.data()));
    console.log(data, "CUSTOMFOODS get")
    store.dispatch(setCustomFoods(data))
    return data;
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
}





export default app;


