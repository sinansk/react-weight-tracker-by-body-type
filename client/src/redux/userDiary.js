import { createSlice } from "@reduxjs/toolkit";

export const userDiary = createSlice({
    name: "userDiary",
    initialState: {
        calorieDiary: null
    },
    reducers: {
        addToDiary: (state, action) => {
            state.calorieDiary = action.payload
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