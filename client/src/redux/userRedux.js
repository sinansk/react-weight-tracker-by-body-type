import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBodyFat,
  fetchIdealWeight,
  fetchMacroNeed,
  updateIdealMeasurements,
} from "./userInfoThunk";
import { converBodyGoalStatus } from "../utils/convertBodyGoalStatus";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    data: {
      personalInfo: {},
      measurements: {},
      idealMeasurements: {},
      results: {
        idealWeightRange: null,
        idealWeightStatus: null,
        bmi: null,
        bodyFat: null,
        bodyFatUsNavy: null,
        calorieNeedByBodyGoal: null,
      },
    },
    status: "idle",
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    setInput: (state, action) => {
      const { name, value, reduxName } = action.payload;

      state.data[reduxName] = { ...state.data[reduxName], [name]: value };
      if (name === "bodyGoal") {
        state.data.personalInfo.bodyGoalStatus = converBodyGoalStatus(value);
      }
      if (name === "birthDay") {
        state.data.personalInfo.age = Math.floor(
          (new Date() - new Date(value).getTime()) / 3.15576e10
        );
      }
    },
    setMeasurements: (state, action) => {
      state.data.measurements = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },

    selectGender: (state, action) => {
      state.data.personalInfo.gender = action.payload;
    },
    setPhotoUrl: (state, action) => {
      state.data.photo = action.payload;
    },
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdealWeight.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIdealWeight.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.results.idealWeightRange = action.payload.idealWeightRange;
        state.data.results.idealWeightStatus = action.payload.idealWeightStatus;
        state.data.results.bmi = action.payload.bmi;
      })
      .addCase(fetchIdealWeight.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBodyFat.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBodyFat.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.results.bodyFat = action.payload;
        state.data.results.bodyFatUsNavy =
          action.payload["Body Fat (U.S. Navy Method)"];
      })
      .addCase(fetchBodyFat.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateIdealMeasurements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateIdealMeasurements.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.idealMeasurements = action.payload;
      })
      .addCase(fetchMacroNeed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMacroNeed.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.results.macroNeed = action.payload.macroNeed;
        state.data.results.calorieNeedByBodyGoal =
          action.payload.calorieNeedByBodyGoal;
        state.data.results.bmr = action.payload.bmr;
      })
      .addCase(fetchMacroNeed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  login,
  logout,
  setData,
  selectGender,
  setIdealMeasurements,
  setIdealWeight,
  setInput,
  reset,
  setPhotoUrl,
  setMeasurements,
} = userSlice.actions;

export const userInfoSelector = (state) => state.user?.data?.personalInfo;
export default userSlice.reducer;
