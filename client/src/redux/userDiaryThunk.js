import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDailyCalorie, getCalorieRecords, getCalorieRecordsForMonth } from "../firebase";

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

export const fetchCalorieRecordsForMonth = createAsyncThunk(
    'userDiary/fetchCalorieRecordsForMonth',
    async ({ year, month }, { getState }, thunkAPI,) => {
        try {
            const { uid } = getState().user.currentUser
            const data = await getCalorieRecordsForMonth(uid, year, month);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);