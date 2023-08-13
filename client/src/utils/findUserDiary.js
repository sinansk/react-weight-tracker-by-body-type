import { useSelector } from 'react-redux';

const useDiaryEntry = (selectedDate) => {
    const userDiary = useSelector((state) => state.userDiary);

    if (!userDiary || !userDiary.calorieDiary) {
        return null;
    }

    const diaryEntry = userDiary?.calorieDiary.find((entry) => entry.date === selectedDate);
    return diaryEntry;
};

export default useDiaryEntry;