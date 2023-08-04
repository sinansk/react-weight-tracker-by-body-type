import { createSlice } from "@reduxjs/toolkit";
import { removeUnit } from "../utils/removeUnit";
import { saveDailyCalorie } from "./userDiaryThunk";

// const updateNutrientDetails = (state, foodDetail, operator) => {
//     const { fat, carbs, protein, calories } = foodDetail;
//     state.nutrientDetails.totalFat = operator(state.nutrientDetails.totalFat, removeUnit(fat));
//     state.nutrientDetails.totalCarbs = operator(state.nutrientDetails.totalCarbs, removeUnit(carbs));
//     state.nutrientDetails.totalProtein = operator(state.nutrientDetails.totalProtein, removeUnit(protein));
//     state.nutrientDetails.totalCalorie = operator(state.nutrientDetails.totalCalorie, removeUnit(calories));
// };
export const userDiary = createSlice({
    name: "userDiary",
    initialState: {
        calorieDiary: [],
        nutrientDetails: {
            totalFat: 0,
            totalCarbs: 0,
            totalProtein: 0,
            totalCalorie: 0
        },
        records: null,
        status: "idle",
        error: null,
    },
    reducers: {
        // addToDiary: (state, action) => {
        //     state.calorieDiary = [...state.calorieDiary, action.payload]
        //     const foodDetail = action.payload.food;
        //     updateNutrientDetails(state, foodDetail, (a, b) => a + b);
        // },
        // deleteFromDiary: (state, action) => {
        //     const itemToDelete = action.payload;
        //     const indexToDelete = state.calorieDiary.findIndex(
        //         (item) => item.food.food_id === itemToDelete.food.food_id
        //     );
        //     if (indexToDelete !== -1) {
        //         state.calorieDiary.splice(indexToDelete, 1);
        //         updateNutrientDetails(state, itemToDelete.food, (a, b) => a - b);
        //     }
        // },
        setDiary: (state, action) => {
            state.calorieDiary = action.payload
        },
        recalculateNutrientDetails: (state) => {
            state.nutrientDetails.totalFat = 0;
            state.nutrientDetails.totalCarbs = 0;
            state.nutrientDetails.totalProtein = 0;
            state.nutrientDetails.totalCalorie = 0;

            state.calorieDiary.forEach((dayRecord) => {
                dayRecord.foods.forEach((food) => {
                    const { fat, carbs, protein, calories } = food.food;
                    state.nutrientDetails.totalFat += removeUnit(fat);
                    state.nutrientDetails.totalCarbs += removeUnit(carbs);
                    state.nutrientDetails.totalProtein += removeUnit(protein);
                    state.nutrientDetails.totalCalorie += removeUnit(calories);
                });
            });
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(saveDailyCalorie.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(saveDailyCalorie.fulfilled, (state, action) => {
                state.records = action.payload
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(saveDailyCalorie.rejected, (state) => {
                state.status = "failed";
                state.error = true;
            });
    },
});

export const { addToDiary, deleteFromDiary, setDiary, recalculateNutrientDetails } = userDiary.actions;
export default userDiary.reducer
export const setDiaryWithNutrientRecalculation = (data) => (dispatch) => {
    dispatch(setDiary(data));
    dispatch(recalculateNutrientDetails());
};