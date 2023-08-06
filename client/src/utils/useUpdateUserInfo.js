import { useDispatch, useSelector } from 'react-redux';
import { fetchIdealWeight, fetchCalorieNeed, fetchBodyFat, updateIdealMeasurements } from '../redux/userInfoThunk';
import { addUserInfo } from '../firebase';
import { serverTimestamp } from 'firebase/firestore';
import { fetchUserInfo } from '../redux/userRecordsThunk';
import { useCallback, useEffect, useState } from 'react';
import { destroyAllModal } from './modalHooks';

const useUpdateUserInfo = () => {
  const dispatch = useDispatch();
  const [dataFetchingCompleted, setDataFetchingCompleted] = useState(false);
  const user = useSelector((state) => state.user)
  const updateUserInfo = async () => {
    try {
      await Promise.all([
        dispatch(fetchIdealWeight()),
        dispatch(fetchCalorieNeed()),
        dispatch(fetchBodyFat()),
        dispatch(updateIdealMeasurements()),
      ]);
      setDataFetchingCompleted(true);
    } catch (err) {
      console.log(err);
    }
  };

  const userInfoToDB = useCallback(async () => {
    await addUserInfo({
      date: serverTimestamp(),
      uid: user.currentUser.uid,
      personalInfo: user.data?.personalInfo,
      idealMeasurements: user.data?.idealMeasurements,
      results: user.data?.results,
    });
    // Reset the flag to false after the data is saved to the database
    setDataFetchingCompleted(false);
    dispatch(fetchUserInfo(user.currentUser.uid));
    destroyAllModal()

  }, [dispatch, user.currentUser.uid, user.data?.personalInfo, user.data?.idealMeasurements, user.data?.results]);

  useEffect(() => {
    if (dataFetchingCompleted) {
      userInfoToDB()
    }
  }, [dataFetchingCompleted, userInfoToDB])

  return updateUserInfo;
};

export default useUpdateUserInfo;