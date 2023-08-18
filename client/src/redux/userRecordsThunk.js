import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRecord, getUserInfo } from "../firebase";

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

export const deleteUserInfo = createAsyncThunk(
    "userRecords/deleteUserInfo",
    async (id) => {
        try {
            const data = await deleteRecord(id);
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);