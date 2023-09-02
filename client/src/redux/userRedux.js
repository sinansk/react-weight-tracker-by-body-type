import { createSlice } from "@reduxjs/toolkit";
import { fetchBodyFat, fetchCalorieNeed, fetchIdealWeight, fetchMacroNeed, updateIdealMeasurements } from "./userInfoThunk";
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
        idealWeight: null,
        idealWeightRange: null,
        idealWeightStatus: null,
        bmi: "",
        bodyFat: null,
        bodyFatUsNavy: null,
        calorieNeed: null,
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
      console.log("reduxName", reduxName, name, value)
      state.data[reduxName] = { ...state.data[reduxName], [name]: value };
      if (name === "bodyGoal") {
        state.data.personalInfo.bodyGoalStatus = converBodyGoalStatus(value)
      }
      if (name === "birthDay") {
        state.data.personalInfo.age = Math.floor((new Date() - new Date(value).getTime()) / 3.15576e+10)
      }
    },
    setMeasurements: (state, action) => {
      state.data.measurements = action.payload
      console.log("reduxa yazıldı")
    },
    setData: (state, action) => {
      state.data = action.payload
    },

    selectGender: (state, action) => {
      state.data.personalInfo.gender = action.payload;
    },
    setPhotoUrl: (state, action) => {
      state.data.photo = action.payload;
    },
    reset: (state) => { },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdealWeight.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIdealWeight.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.data.personalInfo.bodyType === "Ectomorph") {
          state.data.results.idealWeight = action.payload.map((item) =>
            Math.round((item * 96) / 100)
          );
        } else if (state.data.personalInfo.bodyType === "Endomorph") {
          state.data.results.idealWeight = action.payload.map((item) =>
            Math.round((item * 104) / 100)
          );
        } else {
          state.data.results.idealWeight = action.payload.map((item) =>
            Math.round(item)
          );
        }
        state.data.results.idealWeightRange = state.data.results.idealWeight?.[0] + ` - ` + state.data.results.idealWeight[3] + ` kg`
        if (state.data.personalInfo.weight < state.data.results.idealWeight[0]) {
          state.data.results.idealWeightStatus = `You need to gain ${state.data.results.idealWeight[0] - state.data.personalInfo.weight} kg`
        } else if (state.data.personalInfo.weight > state.data.results.idealWeight[3]) {
          state.data.results.idealWeightStatus = `You need to loss ${state.data.personalInfo.weight - state.data.results.idealWeight[3]} kg`
        } else state.data.results.idealWeightStatus = "Your weight is ideal"

        state.data.results.bmi = (
          (state.data.personalInfo.weight /
            (state.data.personalInfo.height * state.data.personalInfo.height)) *
          10000
        ).toFixed(1);

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
        state.data.results.bodyFatUsNavy = action.payload["Body Fat (U.S. Navy Method)"];
      })
      .addCase(fetchBodyFat.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCalorieNeed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCalorieNeed.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.results.calorieNeed = action.payload;   //bc of api data structure things..
        state.data.results.calorieNeedByBodyGoal = state.data.results.calorieNeed["goals"]?.[state.data.personalInfo.bodyGoal]["calory"] ? state.data.results.calorieNeed["goals"]?.[state.data.personalInfo.bodyGoal]["calory"].toFixed(0)
          + ` kcal` : state.data.results.calorieNeed["goals"]?.[state.data.personalInfo.bodyGoal].toFixed(0) + ` kcal`
      })
      .addCase(fetchCalorieNeed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateIdealMeasurements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateIdealMeasurements.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.idealMeasurements = action.payload
      })
      .addCase(fetchMacroNeed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMacroNeed.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.results.macroNeed = action.payload;
      })
      .addCase(fetchMacroNeed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
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
