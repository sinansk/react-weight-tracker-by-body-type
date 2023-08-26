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
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail
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
  getDoc,
  startAfter,
  limit,
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
import { deleteUserRecord, setTotalPages, setUserRecord, updatePhotoRedux } from "./redux/userRecords";
import { fetchUserInfo } from "./redux/userRecordsThunk";
import moment from "moment"
import { deleteDiaryFromRedux, setCalorieRoutines, setDiary, setMonthlyDiary } from "./redux/userDiary";
import { calculateTotalNutrients } from "./utils/calculateTotalNutrients";
import { fetchCalorieRecords, fetchCalorieRecordsForMonth } from "./redux/userDiaryThunk";
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
    store.dispatch(loginHandle(user))
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
      store.dispatch(fetchUserInfo())
      // getUserInfo(user.uid)
      // store.dispatch(fetchCalorieRecords(user.uid))
      const currentDate = moment();
      const year = currentDate.year();
      const month = currentDate.month() + 1;
      store.dispatch(fetchCalorieRecordsForMonth({ year, month }));
      getCustomFoods(user.uid)
      getCalorieRoutines(user.uid)
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

export const deleteStorageDirectory = async (uid, directoryPath) => {
  const storageRef = ref(storage, `users/${uid}/${directoryPath}`);
  const listResult = await listAll(storageRef);
  await Promise.all(listResult.items.map((itemRef) => deleteObject(itemRef)));
};

export const deleteAccount = async (password) => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, password);
  try {
    await reauthenticateWithCredential(user, credential);
    await deleteUserData(user.uid);
    await deleteStorageDirectory(user.uid, "photos");
    await user.delete();
    toast.success("Account deleted successfully.");
    return true;
  } catch (error) {
    toast.error(error.message);
    console.log(error);
    return false;
  }
};
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    toast.success("Password reset email sent")
  } catch (error) {
    toast.error(error.message)
  }
}

export const addUserInfo = async (data) => {
  console.log(data, "addUserInfo")
  try {
    const uid = data.uid
    const userRef = doc(db, "users", uid);
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
    })).sort((a, b) => b.data.timestamp - a.data.timestamp);
    store.dispatch(setData(data?.[0].data))
    return data;
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
};

export const updateUserInfo = async (uid, id, data) => {
  console.log("uid", uid, "id:", id, "data", data)
  try {
    const userRef = doc(db, "users", uid, "userPersonalInfos", id);
    await updateDoc(userRef, data);
    toast.success("Updated successfully");
    onSnapshot(userRef, (snapshot) => {
      console.log("Snapshot changes:", snapshot.data());
    });
    return true;
  } catch (error) {
    toast.error(error.message);
    console.log(error)
    throw new Error(error.message);
  }
}
export const deleteRecord = async (uid, id) => {
  console.log("uid", uid, "id:", id);
  try {
    await deleteDoc(doc(db, "users", uid, "userPersonalInfos", id));
    store.dispatch(deleteUserRecord(id)); // Redux store'u güncelle
    toast.success("Deleted successfully");
  } catch (error) {
    toast.error(error.message);
    console.log(error)
    throw new Error(error.message);
  }
};

export const deleteUserData = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  await deleteDoc(userDocRef);
  const userPersonalInfosRef = collection(userDocRef, "userPersonalInfos");
  const userPersonalInfosSnapshot = await getDocs(userPersonalInfosRef);
  userPersonalInfosSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
  const calorieRecordsRef = collection(userDocRef, "CalorieRecords");
  const calorieRecordsSnapshot = await getDocs(calorieRecordsRef);
  calorieRecordsSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
  const customFoodsRef = collection(userDocRef, "CustomFoods");
  const customFoodsSnapshot = await getDocs(customFoodsRef);
  customFoodsSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  console.log("User data deleted successfully.");
};

export const addPhoto = async (uid, id, photoFile, docId) => {
  console.log("uid", uid, "id:", id, "photoFile", photoFile);
  try {
    const storageRef = ref(storage, `users/${uid}/photos/${id}`);
    const result = await uploadBytes(storageRef, photoFile);
    console.log("result", result)
    const downloadURL = await getDownloadURL(storageRef);

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
    store.dispatch(updatePhotoRedux({ id: docId, photo: null })); // Redux store'u güncelle

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
  console.log(data, "data", calorieDiary, "calorieDiary", selectedDate, "selectedDate")
  const uid = data.uid;
  const currentDate = moment();
  const timestamp = moment(selectedDate, "DD-MM-YYYY").toISOString();
  const dateString = currentDate.format('DD-MM-YYYY');
  const totalNutrient = {
    totalFat: data.food.fat,
    totalCarbs: data.food.carbs,
    totalProtein: data.food.protein,
    totalCalories: data.food.calories
  }
  const food = data.food
  const newtotalNutrient = calculateTotalNutrients({ calorieDiary, selectedDate, food, operation: "add" });
  const diary = {
    ...food,
    timestamp,
    uid: data.uid,
    id: Date.now(),
    createdAt: currentDate.toISOString(), // Store the timestamp as a string in ISO format
  };

  try {
    const userRef = collection(db, "users");
    const userDocRef = doc(userRef, uid); // Reference to the user document
    const calorieRecordsRef = collection(userDocRef, "calorieRecords");
    const querySnapshot = await getDocs(query(calorieRecordsRef, where("date", "==", selectedDate)));
    if (querySnapshot.empty) {
      // If the document doesn't exist, create a new document with the current date
      await addDoc(calorieRecordsRef, { date: selectedDate, foods: [diary], totalNutrient, timestamp });
    } else {
      // If the document exists, update the array field by appending the new food data
      const existingDocId = querySnapshot.docs[0].id;
      await updateDoc(doc(calorieRecordsRef, existingDocId), {
        foods: arrayUnion(diary), // Append the new diary object to the existing "foods" array
        totalNutrient: newtotalNutrient
      });
    }
    // Now, let's listen for any changes to the document and perform necessary actions.
    // onSnapshot(collection(userDocRef, "calorieRecords"), (snapshot) => {
    //   // This callback function will be triggered whenever there are changes to the document with the specified date.
    //   // You can handle the changes here, if needed.
    //   // For example, you can log the changes or dispatch an action to update your Redux store.
    //   console.log("Snapshot changes:", snapshot.docs.map((doc) => doc.data()));
    //   store.dispatch(setDiary(snapshot.docs.map((doc) => doc.data())))
    // });

    // Listen for changes in the monthly records
    const selectedMoment = moment(selectedDate, 'DD-MM-YYYY');
    const year = selectedMoment.year();
    const month = selectedMoment.month() + 1;
    store.dispatch(fetchCalorieRecordsForMonth({ uid, year, month }));
    // const monthlyRecords = await getCalorieRecordsForMonth(uid, year, month);
    // store.dispatch(setMonthlyDiary(monthlyRecords)); // Assuming you have an action like "setMonthlyDiary" to update the Redux store
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
      store.dispatch(fetchCalorieRecordsForMonth({ uid, year: moment(selectedDate, 'DD-MM-YYYY').year(), month: moment(selectedDate, 'DD-MM-YYYY').month() + 1 }));
      return "Data deleted successfully.";
    }

    // onSnapshot(collection(userDocRef, "calorieRecords"), (snapshot) => {

    //   console.log("Snapshot changes:", snapshot.docs.map((doc) => doc.data()));
    //   store.dispatch(setDiary(snapshot.docs.map((doc) => doc.data())))
    // });
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

export const getCalorieRecordsForMonth = async (uid, year, month) => {
  try {
    console.log("records", month,)
    const startDateWithTime = moment([year, month - 1, 1]).toISOString(); // ISO 8601 formatında tarih ve saat
    const endDateWithTime = moment([year, month - 1]).endOf('month').toISOString(); // ISO 8601 formatında tarih ve saat
    console.log(startDateWithTime, "startDateWithTime", endDateWithTime, "endDateWithTime", "records")
    const snapshot = await getDocs(
      query(
        collection(db, "users", uid, "calorieRecords"),
        where("timestamp", ">=", startDateWithTime),
        where("timestamp", "<=", endDateWithTime)
      )
    );
    const data = snapshot.docs.map((doc) => doc.data());

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const saveDiaryAsRoutine = async (data) => {
  const uid = data.uid;
  const name = data.name;
  const foods = data.foods;
  const selectedDate = data.selectedDate;
  const totalNutrient = data.totalNutrient;
  const currentDate = moment();
  const timestamp = moment().toISOString();
  const dateString = currentDate.format('DD-MM-YYYY');
  console.log(data, "dataROUTINE")
  try {
    const userRef = collection(db, "users");
    const userDocRef = doc(userRef, uid);
    const calorieRoutineRef = collection(userDocRef, "calorieRoutines");
    const querySnapshot = await getDocs(query(calorieRoutineRef, where("name", "==", name)));
    if (querySnapshot.empty) {
      await addDoc(calorieRoutineRef, { name: name, date: selectedDate, foods, totalNutrient, timestamp });
    } else {
      const existingDocId = querySnapshot.docs[0].id;
      await updateDoc(doc(calorieRoutineRef, existingDocId), {
        foods: arrayUnion(...foods), // Append the new diary object to the existing "foods" array

      });

    }
    toast.success("Routine saved successfully.");
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
}

export const getCalorieRoutines = async (uid) => {
  try {
    const snapshot = await getDocs(query(collection(db, "users", uid, "calorieRoutines")));
    const data = snapshot.docs.map((doc) => (doc.data()));
    console.log(data, "dataROUTINE")
    store.dispatch(setCalorieRoutines(data))
    return data;
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
};
export const copyDiary = async (data) => {
  console.log(data, "data")
  const uid = data.uid;
  const foods = data.foods;
  const selectedDate = data.selectedDate;
  const totalNutrient = data.totalNutrient;
  const currentDate = moment();
  const timestamp = moment(selectedDate, "DD-MM-YYYY").toISOString();
  const dateString = currentDate.format('DD-MM-YYYY');

  try {
    const userRef = collection(db, "users");
    const userDocRef = doc(userRef, uid); // Reference to the user document
    const calorieRecordsRef = collection(userDocRef, "calorieRecords");
    const querySnapshot = await getDocs(query(calorieRecordsRef, where("date", "==", selectedDate)));
    if (querySnapshot.empty) {
      await addDoc(calorieRecordsRef, { date: selectedDate, foods, totalNutrient, timestamp });
    } else {
      const existingDocId = querySnapshot.docs[0].id;
      await updateDoc(doc(calorieRecordsRef, existingDocId), {
        foods: arrayUnion(...foods), // Append the new diary object to the existing "foods" array

      });

    }
    const selectedMoment = moment(selectedDate, 'DD-MM-YYYY');
    const year = selectedMoment.year();
    const month = selectedMoment.month() + 1;
    store.dispatch(fetchCalorieRecordsForMonth({ uid, year, month }));
    toast.success("Data copied successfully.");
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
}

export const deleteDiary = async (data) => {
  console.log(data, "data")
  const selectedDate = data.selectedDate;
  const uid = data.uid;
  try {
    const userRef = collection(db, "users");
    const userDocRef = doc(userRef, uid);
    const calorieRecordsRef = collection(userDocRef, "calorieRecords");
    // Query for the document with the specified date
    const querySnapshot = await getDocs(query(calorieRecordsRef, where("date", "==", selectedDate)));
    console.log(querySnapshot)
    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      await deleteDoc(doc(calorieRecordsRef, docId))
      toast.success("Data deleted successfully.");
      store.dispatch(deleteDiaryFromRedux(data.selectedDate));
      return "Data deleted successfully.";
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }

  // try {
  //   await deleteDoc(doc(db, "users", data.uid, "calorieRecords", data.id));
  //   store.dispatch(deleteDiary(data.id));
  // } catch {
  //   toast.error("An error occurred while deleting the diary.");
  // }
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
      getCustomFoods(uid)
      toast.success("Food Saved And Added To Diary ")
      // A food with the same ID already exists, skip saving
    } else {
      return;
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
}

export const deleteCustomFood = async (data) => {
  const uid = data.uid;
  const id = data.id;
  console.log("uid", data, "id:", data, "deleteCustomFood");
  try {
    const customFoodsRef = collection(db, "users", uid, "customFoods");
    const querySnapshot = await getDocs(query(customFoodsRef, where("id", "==", id)));
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      await deleteDoc(doc(customFoodsRef, docSnapshot.id));
      getCustomFoods(uid)
    } else {
      console.log("Custom food not found. deleteCustomFood");
    }
  } catch (error) {
    toast.error(error.message);
    console.error(error);
    throw new Error(error.message);
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