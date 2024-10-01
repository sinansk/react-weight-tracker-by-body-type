import React from 'react'
import DiaryCardComponent from './DiaryCardComponent copy'
import { useSelector } from 'react-redux';

const FoodCalorieCard = () => {
    const selectedDate = "12-08-2023"
    const uid = useSelector((state) => state.user.currentUser.uid)
    const calorieDiary = useSelector((state) => state.userDiary.calorieDiary)
    const diaryEntry = calorieDiary.find((entry) => entry.date === selectedDate);
    const foods = diaryEntry?.foods;
    const initalCustomCalorie = {
        id: Date.now(),
        uid: uid,
        calorie: {
            amount: "",
            food_name: "Quick Calorie",
            carbs: "",
            fat: "",
            protein: "",
            calories: ""
        }
    }

    const headerColumns = [{ id: "amount", label: "Amount", colSpan: 1 },
    { id: "food_name", label: "Food", colSpan: 1 },
    { id: "carbs", label: "Carbs", unit: "g", colSpan: 1 },
    { id: "fat", label: "Fat", unit: "g", colSpan: 1 },
    { id: "protein", label: "Protein", unit: "g", colSpan: 1 },
    { id: "calories", label: "Calories", unit: "kcal", colSpan: 1 }]
    return (
        <DiaryCardComponent headerColumns={headerColumns} initalCustomCalorie={initalCustomCalorie} diaryItems={foods} diaryEntry={diaryEntry} selectedDate={selectedDate} />
    )
}

export default FoodCalorieCard