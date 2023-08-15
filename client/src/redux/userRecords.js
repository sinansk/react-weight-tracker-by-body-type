import { createSlice } from "@reduxjs/toolkit";
import { deleteUserInfo, fetchUserInfo } from "./userRecordsThunk";

export const userRecordsSlice = createSlice({
    name: "userRecords",
    initialState: {
        currentUser: null,
        status: "idle",
        error: false,
        records: null,
        currentPage: 1,
        itemsPerPage: 30,
    },

    reducers: {
        setUserRecord: (state, action) => {
            state.records = action.payload
        },
        deleteUserRecord: (state, action) => {
            const id = action.payload;
            state.records = state.records.filter((record) => record.id !== id);
        },
        deletePhotoRedux: (state, action) => {
            state.records.find((record) => record.id === action.payload).data.photo = null
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
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
            })
            .addCase(deleteUserInfo.pending, (state) => {
                state.status = "loading";
                state.error = false;
            })
            .addCase(deleteUserInfo.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.records = action.payload;
            })
            .addCase(deleteUserInfo.rejected, (state, action) => {
                state.status = "failed";
                state.error = true;
            })
    },
});

export const usePageSize = (state) => state.userRecords.pageSize
export const { setUserRecord, deleteUserRecord, deletePhotoRedux, setTotalPages, setCurrentPage } = userRecordsSlice.actions
export default userRecordsSlice.reducer