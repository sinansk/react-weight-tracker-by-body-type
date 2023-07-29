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
} from "firebase/firestore";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { store } from "./redux/store";
import {
  login as loginHandle,
  logout as logoutHandle,
  setData,
  setPersonalInfo,
} from "./redux/userRedux";
import { deleteRecordAction, setRecords } from "./redux/userRecords";
import { fetchUserInfo } from "./redux/userRecordsThunk";

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
    store.dispatch(loginHandle(user))
    store.dispatch(fetchUserInfo(user.uid))
    // getUserInfo(user.uid)
  } else {
    store.dispatch(logoutHandle());
  }
});

export const addUserInfo = async (data) => {
  try {
    const result = await addDoc(collection(db, "userInfos"), data);
    return result
  } catch (error) {
    toast.error(error.message)
  }
};

export const getUserInfo = (uid) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      query(collection(db, "userInfos"), where("uid", "==", uid)),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id, // Belge kimliği
          data: doc.data() // Belge verisi
        })).sort((a, b) => b.data.date - a.data.date);

        unsubscribe(); // Unsubscribe from further updates
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const deleteRecord = async (uid, id) => {
  console.log("uid", uid, "id:", id)
  try {
    await deleteDoc(doc(db, "userInfos", id))
    store.dispatch(deleteRecordAction(id)); // Redux store'u güncelle
    toast.success("Veri başarıyla silindi");
  } catch (error) {
    toast.error(error.message)
  }
}



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
