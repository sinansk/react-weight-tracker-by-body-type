import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDailyCalorie, getCalorieRecords } from "../firebase";

export const saveDailyCalorie = createAsyncThunk(
    "userDiary/saveDailyCalorie",
    async (_, { getState }) => {
        try {
            const { uid } = getState().user.currentUser;
            const data = await addDailyCalorie(uid);
            return data
        } catch (error) {
            throw new Error(error.message)
        }
    }
)

export const fetchCalorieRecords = createAsyncThunk(
    "userDiary/fetchCalorieRecords",
    async (_, { getState }) => {
        try {
            const { uid } = getState().user.currentUser
            const data = await getCalorieRecords(uid);
            return data
        } catch (error) {
            throw new Error(error.message)
        }
    }
)