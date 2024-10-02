import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCalorieRecords,
  fetchCalorieRecordsForMonth,
  saveDailyCalorie,
} from "./userDiaryThunk";
import moment from "moment";
export const userDiary = createSlice({
  name: "userDiary",
  initialState: {
    calorieDiary: [],
    exerciseDiary: [
      {
        date: "12-08-2023",
        exercises: [
          {
            exercise_name: "Pushups",
            calories: 100,
            set: 4,
            rep: 10,
            weight: 10,
          },
          {
            exercise_name: "Pullups",
            calories: 100,
            set: 4,
            rep: 10,
            weight: 10,
          },
        ],
      },
    ],
    calorieRoutines: null,
    calendarDate: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setDiary: (state, action) => {
      state.calorieDiary = action.payload;
    },
    setCalendarDate: (state, action) => {
      state.calendarDate = action.payload;
    },
    setMonthlyDiary: (state, action) => {
      state.calorieDiary = action.payload;
    },
    deleteDiaryFromRedux: (state, action) => {
      state.calorieDiary = state.calorieDiary.filter(
        (item) => item.date !== action.payload
      );
    },
    setCalorieRoutines: (state, action) => {
      state.calorieRoutines = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveDailyCalorie.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(saveDailyCalorie.fulfilled, (state, action) => {
        state.records = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(saveDailyCalorie.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(fetchCalorieRecords.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCalorieRecords.fulfilled, (state, action) => {
        state.calorieDiary = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchCalorieRecords.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(fetchCalorieRecordsForMonth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCalorieRecordsForMonth.fulfilled, (state, action) => {
        state.calorieDiary = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchCalorieRecordsForMonth.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      });
  },
});

export const {
  addToDiary,
  deleteFromDiary,
  setDiary,
  setCalendarDate,
  recalculateNutrientDetails,
  setTotal,
  setMonthlyDiary,
  deleteDiaryFromRedux,
  setCalorieRoutines,
} = userDiary.actions;
export default userDiary.reducer;
