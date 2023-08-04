import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDailyCalorie } from "../firebase";

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

// export const getCalorieRecords = createAsyncThunk(
//     "userDiary/getCalorieRecords",
//     async(_, {getState}) => {
//         try {
//             const {uid} => getState().user.currentUser
//             const data = await
//         }
//     }
// )