import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "../firebase";

// Async thunk to fetch user info
export const fetchUserInfo = createAsyncThunk(
    "userRecords/fetchUserInfo",
    async (uid) => {
        try {
            const data = await getUserInfo(uid);
            console.log(data)
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const deleteRecord = createAsyncThunk(
    "userRecords/deleteRecord",
    async (id) => {
        try {
            const data = await deleteRecord(id);
            console.log(data)
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);