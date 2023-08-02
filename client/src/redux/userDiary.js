import { createSlice } from "@reduxjs/toolkit";
import { removeUnit } from "../utils/removeUnit";

export const userDiary = createSlice({
    name: "userDiary",
    initialState: {
        calorieDiary: [],
        totalCalorie: 0
    },
    reducers: {
        addToDiary: (state, action) => {
            state.calorieDiary = [...state.calorieDiary, action.payload]
            const calories = removeUnit(action.payload.food_detail.calories)
            state.totalCalorie += calories

        },
        deleteFromDiary: (state, action) => {
        }
    },
    extraReducers: {

    }
}
);

export const { addToDiary, deleteFromDiary } = userDiary.actions;
export default userDiary.reducer