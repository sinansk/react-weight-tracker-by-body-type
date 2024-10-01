import React from 'react'
import DiaryCardComponent from './DiaryCardComponent copy'
import { useSelector } from 'react-redux';

const ExerciseCalorieCard = () => {
    const selectedDate = "12-08-2023"
    const uid = useSelector((state) => state.user.currentUser.uid)
    const exerciseDiary = useSelector((state) => state.userDiary.exerciseDiary)
    const diaryEntry = exerciseDiary.find((entry) => entry.date === selectedDate);
    const exercises = diaryEntry?.exercises;
    const initalCustomCalorie = {
        id: Date.now(),
        uid: uid,
        calorie: {
            exercise_name: "Quick Exercise",
            rep: "",
            set: "",
            weight: "",
            calories: ""
        }
    }

    const headerColumns = [
        { id: "exercise_name", label: "Exercise", colSpan: 2 },
        { id: "rep", label: "Rep", unit: "rep", colSpan: 1 },
        { id: "set", label: "Set", unit: "set", colSpan: 1 },
        { id: "weight", label: "Weight", unit: "kg", colSpan: 1 },
        { id: "calories", label: "Calories", unit: "kcal", colSpan: 1 }]
    return (
        <DiaryCardComponent headerColumns={headerColumns} initalCustomCalorie={initalCustomCalorie} diaryItems={exercises} diaryEntry={diaryEntry} selectedDate={selectedDate} />
    )
}

export default ExerciseCalorieCard