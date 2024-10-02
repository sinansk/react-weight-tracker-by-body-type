import { createSlice } from "@reduxjs/toolkit";

export const favFoodsSlice = createSlice({
  name: "favFoods",
  initialState: {
    favFoods: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setFavFoods: (state, action) => {
      state.favFoods = action.payload;
    },
    addFavFoodToRedux: (state, action) => {
      state.favFoods.push(action.payload);
    },
    deleteFavFoodFromRedux: (state, action) => {
      state.favFoods = state.favFoods.filter(
        (food) => food.food_id !== action.payload
      );
    },
  },
});

export const { setFavFoods, addFavFoodToRedux, deleteFavFoodFromRedux } =
  favFoodsSlice.actions;
export default favFoodsSlice.reducer;
