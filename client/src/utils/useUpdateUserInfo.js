import { useDispatch, useSelector } from 'react-redux';
import { fetchIdealWeight, fetchCalorieNeed, fetchBodyFat, updateIdealMeasurements, fetchMacroNeed } from '../redux/userInfoThunk';
import { addUserInfo } from '../firebase';
import { serverTimestamp } from 'firebase/firestore';
import { fetchUserInfo } from '../redux/userRecordsThunk';
import { useCallback, useEffect, useState } from 'react';
import { destroyAllModal } from './modalHooks';
import moment from 'moment';
const useUpdateUserInfo = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'))
  const dispatch = useDispatch();
  const [dataFetchingCompleted, setDataFetchingCompleted] = useState(false);
  const user = useSelector((state) => state.user)
  const updateUserInfo = async (date) => {
    try {
      await Promise.all([
        dispatch(fetchIdealWeight()),
        dispatch(fetchCalorieNeed()),
        dispatch(fetchBodyFat()),
        dispatch(updateIdealMeasurements()),
        dispatch(fetchMacroNeed()),
      ]);
      setDataFetchingCompleted(true);
      setSelectedDate(date)
    } catch (err) {
      console.log(err);
    }
  };

  const userInfoToDB = useCallback(async () => {
    await addUserInfo({
      timestamp: serverTimestamp(),
      date: selectedDate ?? moment().format('DD-MM-YYYY'),
      uid: user.currentUser.uid,
      personalInfo: user.data?.personalInfo,
      measurements: user.data?.measurements,
      idealMeasurements: user.data?.idealMeasurements,
      results: user.data?.results,
      photo: {
        id: user.data?.photo?.id || null,
        url: user.data?.photo?.url || null,
      }
    });
    // Reset the flag to false after the data is saved to the database
    setDataFetchingCompleted(false);
    dispatch(fetchUserInfo(user.currentUser.uid));
    destroyAllModal()

  }, [dispatch, user.currentUser.uid, user.data?.personalInfo, user.data?.idealMeasurements, user.data?.results, user.data?.photo, user.data?.measurements, selectedDate]);

  useEffect(() => {
    if (dataFetchingCompleted) {
      userInfoToDB()
    }
  }, [dataFetchingCompleted, userInfoToDB])

  return updateUserInfo;
};

export default useUpdateUserInfo;