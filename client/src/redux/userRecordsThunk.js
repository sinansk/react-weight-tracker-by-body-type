import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "../firebase";

// Async thunk to fetch user info
export const fetchUserInfo = createAsyncThunk(
    "userRecords/fetchUserInfo",
    async (_, { getState }) => {
        try {
            const { uid } = getState().user.currentUser;
            const data = await getUserInfo(uid);
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
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);