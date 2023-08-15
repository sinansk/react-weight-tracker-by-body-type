import { useSelector } from 'react-redux';

const useUserRecord = (selectedDate) => {
    const userRecords = useSelector((state) => state.userRecords?.records);

    if (!userRecords) {
        return;
    }

    const record = userRecords.find((entry) => entry.data.date === selectedDate);
    if (record) {
        return record.data;
    } else return userRecords[0]?.data

};

export default useUserRecord;