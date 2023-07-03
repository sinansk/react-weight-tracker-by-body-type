import { createSlice } from "@reduxjs/toolkit";


export const userRecordsSlice = createSlice({
    name: "userRecords",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        records: null
    },

    reducers: {
        setRecords: (state, action) => {
            state.records = action.payload
        }
    }
});

export const { setRecords } = userRecordsSlice.actions
export default userRecordsSlice.reducer