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
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { store } from "./redux/store";
import {
  login as loginHandle,
  logout as logoutHandle,
  reset,
  setData,
  setPersonalInfo,
} from "./redux/userRedux";
import { deleteRecordAction, deleteUserRecord, setRecords } from "./redux/userRecords";
import { fetchUserInfo } from "./redux/userRecordsThunk";
import moment from "moment"
import { setDiary, setDiaryWithNutrientRecalculation } from "./redux/userDiary";
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
    store.dispatch(reset())
  }
});

export const addUserInfo = async (data) => {
  try {
    const uid = data.uid
    const userRef = doc(db, "users", uid);
    // Kullanıcının "userPersonalInfos" koleksiyonunu oluşturun
    const userPersonalInfoRef = collection(userRef, "userPersonalInfos");
    const result = await addDoc(userPersonalInfoRef, data);
    // const result = await addDoc(collection(db, "userInfos"), data);
    return result
  } catch (error) {
    toast.error(error.message)
    console.log(error)
  }
};

export const addDailyCalorie = async (data) => {
  const uid = data.uid;
  const currentDate = moment();
  const dateString = currentDate.format('DD-MM-YYYY');

  const diary = {
    timestamp: currentDate.toISOString(), // Store the timestamp as a string in ISO format
    uid: data.uid,
    food: data.food,
    date: dateString, // Add the date field to the document
    id: Date.now()
  };

  try {
    const userRef = collection(db, "users");
    const userDocRef = doc(userRef, uid); // Reference to the user document
    const calorieRecordsRef = collection(userDocRef, "calorieRecords");
    const querySnapshot = await getDocs(query(calorieRecordsRef, where("date", "==", dateString)));
    console.log(querySnapshot)
    if (querySnapshot.empty) {
      // If the document doesn't exist, create a new document with the current date
      await addDoc(calorieRecordsRef, { date: dateString, foods: [diary] });
    } else {
      // If the document exists, update the array field by appending the new food data
      const existingDocId = querySnapshot.docs[0].id;
      await updateDoc(doc(calorieRecordsRef, existingDocId), {
        foods: arrayUnion(diary) // Append the new diary object to the existing "foods" array
      });
    }
    // Now, let's listen for any changes to the document and perform necessary actions.
    onSnapshot(collection(userDocRef, "calorieRecords"), (snapshot) => {
      // This callback function will be triggered whenever there are changes to the document with the specified date.
      // You can handle the changes here, if needed.
      // For example, you can log the changes or dispatch an action to update your Redux store.
      console.log("Snapshot changes:", snapshot.docs.map((doc) => doc.data()));
      // store.dispatch(setDiary(snapshot.docs.map((doc) => doc.data())))
      store.dispatch(setDiaryWithNutrientRecalculation(snapshot.docs.map((doc) => doc.data())))
    });
    return "Data added successfully.";
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};


export const deleteDailyCalorie = async (data) => {
  console.log(data)
  const id = data.id
  const uid = data.uid;
  const dateString = data.date;
  try {
    const userRef = collection(db, "users");
    const userDocRef = doc(userRef, uid);
    const calorieRecordsRef = collection(userDocRef, "calorieRecords");

    // Query for the document with the specified date
    const querySnapshot = await getDocs(query(calorieRecordsRef, where("date", "==", dateString)));
    console.log(querySnapshot)
    if (!querySnapshot.empty) {
      // If the document exists, delete it
      const docId = querySnapshot.docs[0].id;
      const docData = querySnapshot.docs[0].data();
      const updatedFoods = docData.foods.filter((food) => food.id !== id);
      await updateDoc(doc(calorieRecordsRef, docId), { foods: updatedFoods });
      // await deleteDoc(doc(calorieRecordsRef, docId));
      toast.success("Data deleted successfully.");
      return "Data deleted successfully.";
    } else {
      // If the document does not exist, return a message indicating that it was not found
      return "Data not found.";
    }

  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};









// export const getUserInfo = (uid) => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = onSnapshot(
//       query(collection(db, "userInfos"), where("uid", "==", uid)),
//       (snapshot) => {
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id, // Belge kimliği
//           data: doc.data() // Belge verisi
//         })).sort((a, b) => b.data.date - a.data.date);

//         unsubscribe(); // Unsubscribe from further updates
//         resolve(data);
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });
// };

export const getUserInfo = async (uid) => {
  try {
    const snapshot = await getDocs(query(collection(db, "users", uid, "userPersonalInfos")));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    })).sort((a, b) => b.data.date - a.data.date);

    return data;
  } catch (error) {

    console.log(error)
    throw new Error(error.message);

  }
};

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


// export const deleteRecord = async (uid, id) => {
//   console.log("uid", uid, "id:", id)
//   try {
//     await deleteDoc(doc(db, "userInfos", id))
//     store.dispatch(deleteRecordAction(id)); // Redux store'u güncelle
//     toast.success("Veri başarıyla silindi");
//   } catch (error) {
//     toast.error(error.message)
//   }
// }



// export const addUserInfo = async (data) => {
//   const result = await setDoc(doc(db, "users", data.uid), data);
//   console.log(data);
//   console.log(result);
// };

// export const addUserInfo = async (data) => {
//   const result = await setDoc(collection(db, "users", data.uid), data);
//   console.log(data);
//   console.log(result);
// };

export default app;
