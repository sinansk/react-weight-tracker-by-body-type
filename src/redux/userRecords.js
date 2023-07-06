import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo } from "./userRecordsThunk";

export const userRecordsSlice = createSlice({
    name: "userRecords",
    initialState: {
        currentUser: null,
        status: "idle",
        error: false,
        records: null
    },

    reducers: {
        setRecords: (state, action) => {
            state.records = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.status = "loading";
                state.error = false;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.records = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.status = "failed";
                state.error = true;
            });
    },
});


export const { setRecords } = userRecordsSlice.actions
export default userRecordsSlice.reducer