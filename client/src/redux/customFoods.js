import { createSlice } from "@reduxjs/toolkit";

export const customFoods = createSlice({
    name: "customFoods",
    initialState: {
        customFoods: [],
        status: "idle",
        error: null,
    },
    reducers: {
        setCustomFoods: (state, action) => {
            console.log(action.payload, "action.payload")
            state.customFoods = action.payload
        },
    },
    extraReducers: (builder) => { }

});
export const { setCustomFoods } = customFoods.actions;
export default customFoods.reducer