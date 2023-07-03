import { createSlice } from "@reduxjs/toolkit";
import { fetchBodyFat, fetchCalorieNeed, fetchIdealWeight } from "./userInfoThunk";
import { calculateMeasurements } from "../utils/calculateMeasurements";

// const initialState = {
//   currentUser: null
// }

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    personalInfo: {
      birthDay: "29.01.1993",
      gender: "male",
      height: 169,
      weight: 60,
      age: 29,
      bodyType: "Ectomorph",
      bodyGoal: "maintain weight",
      activityLevel: "level_1",
      neck: 34,
      shoulder: 112,
      chest: 95,
      arm: 34,
      foreArm: 28,
      wrist: 15,
      waist: 70,
      hip: 86,
      thigh: 56,
      calve: 34,
    },
    idealMeasurements: null,
    results: {
      idealWeight: null,
      idealWeightRange: null,
      idealWeightStatus: null,
      bmi: "",
      bodyFat: null,
      calorieNeed: null,
      calorieNeedByBodyGoal: null,
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
      const { name, value } = action.payload;
      state.personalInfo[name] = value;
    },
    // setUserBirthday: (state, action) => {
    //   state.personalInfo.userBirthday = action.payload;
    // },
    // setAge: (state, action) => {
    //   state.personalInfo.age = action.payload;
    // },
    // setWeight: (state, action) => {
    //   state.personalInfo.weight = action.payload;
    // },
    // setHeight: (state, action) => {
    //   state.personalInfo.height = action.payload;
    // },
    // setNeck: (state, action) => {
    //   state.measurements.neck = action.payload;
    // },
    // setShoulder: (state, action) => {
    //   state.measurements.shoulder = action.payload;
    // },
    // setChest: (state, action) => {
    //   state.measurements.chest = action.payload;
    // },
    // setArm: (state, action) => {
    //   state.measurements.arm = action.payload;
    // },
    // setForeArm: (state, action) => {
    //   state.measurements.foreArm = action.payload;
    // },
    // setWrist: (state, action) => {
    //   state.measurements.wrist = action.payload;
    //   state.idealMeasurements.wrist = action.payload;
    // },
    // setThigh: (state, action) => {
    //   state.measurements.thigh = action.payload;
    // },
    // setCalve: (state, action) => {
    //   state.measurements.calve = action.payload;
    // },
    // setWaist: (state, action) => {
    //   state.measurements.waist = action.payload;
    // },
    // setHip: (state, action) => {
    //   state.measurements.hip = action.payload;
    // },
    // setBodyType: (state, action) => {
    //   state.personalInfo.bodyType = action.payload;
    // },
    // setIdealWeight: (state, action) => {
    //   if (state.personalInfo.bodyType === "Ectomorph") {
    //     state.personalInfo.idealWeight = action.payload.map((item) =>
    //       Math.round((item * 96) / 100)
    //     );
    //   } else if (state.personalInfo.bodyType === "Endomorph") {
    //     state.personalInfo.idealWeight = action.payload.map((item) =>
    //       Math.round((item * 104) / 100)
    //     );
    //   } else {
    //     state.personalInfo.idealWeight = action.payload.map((item) =>
    //       Math.round(item)
    //     );
    //   }
    //   state.personalInfo.bmi = (
    //     (state.personalInfo.weight /
    //       (state.personalInfo.height * state.personalInfo.height)) *
    //     10000
    //   ).toFixed(1);
    // },
    selectGender: (state, action) => {
      state.personalInfo.gender = action.payload;
    },

    // setIdealMeasurements: (state, action) => {
    //   state.idealMeasurements.chest = Math.round(
    //     state.idealMeasurements.wrist * 6.5
    //   );
    //   state.idealMeasurements.neck = Math.round(
    //     state.idealMeasurements.chest * 0.37
    //   );
    //   state.idealMeasurements.arm = Math.round(
    //     state.idealMeasurements.chest * 0.36
    //   );
    //   state.idealMeasurements.foreArm = Math.round(
    //     state.idealMeasurements.chest * 0.29
    //   );
    //   state.idealMeasurements.waist = Math.round(
    //     state.idealMeasurements.chest * 0.7
    //   );
    //   state.idealMeasurements.hip = Math.round(
    //     state.idealMeasurements.chest * 0.85
    //   );
    //   state.idealMeasurements.thigh = Math.round(
    //     state.idealMeasurements.chest * 0.53
    //   );
    //   state.idealMeasurements.calve = Math.round(
    //     state.idealMeasurements.chest * 0.34
    //   );
    //   state.idealMeasurements.shoulder = Math.round(
    //     state.idealMeasurements.waist * 1.61
    //   );
    // },
    setIdealMeasurements: (state) => {
      const { wrist, gender } = state.personalInfo;
      state.idealMeasurements = calculateMeasurements(wrist, gender)
    },
    // setBodyFat: (state, action) => {
    //   state.personalInfo.bodyFat = action.payload;
    // },
    // setActivityLevel: (state, action) => {
    //   state.personalInfo.activityLevel = action.payload;
    // },
    // setBodyGoal: (state, action) => {
    //   state.personalInfo.bodyGoal = action.payload;
    // },
    // setCalorieNeed: (state, action) => {
    //   state.personalInfo.calorieNeed = action.payload;
    // },
    reset: (state) => { },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdealWeight.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIdealWeight.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.personalInfo.bodyType === "Ectomorph") {
          state.results.idealWeight = action.payload.map((item) =>
            Math.round((item * 96) / 100)
          );
        } else if (state.personalInfo.bodyType === "Endomorph") {
          state.results.idealWeight = action.payload.map((item) =>
            Math.round((item * 104) / 100)
          );
        } else {
          state.results.idealWeight = action.payload.map((item) =>
            Math.round(item)
          );
        }
        state.results.idealWeightRange = state.results.idealWeight?.[0] + ` - ` + state.results.idealWeight[3]
        if (state.personalInfo.weight < state.results.idealWeight[0]) {
          state.results.idealWeightStatus = `You need to gain ${state.results.idealWeight[0] - state.personalInfo.weight} kg`
        } else if (state.personalInfo.weight > state.results.idealWeight[3]) {
          state.results.idealWeightStatus = `You need to loss ${state.personalInfo.weight - state.results.idealWeight[3]} kg`
        } else state.results.idealWeightStatus = "Your weight is ideal"

        state.bmi = (
          (state.personalInfo.weight /
            (state.personalInfo.height * state.personalInfo.height)) *
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
        state.results.bodyFat = action.payload;
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
        state.results.calorieNeed = action.payload;   //bc of api data structure things..
        state.results.calorieNeedByBodyGoal = state.results.calorieNeed["goals"]?.[state.personalInfo.bodyGoal]["calory"] ? state.results.calorieNeed["goals"]?.[state.personalInfo.bodyGoal]["calory"].toFixed(0)
          + ` kcal` : state.results.calorieNeed["goals"]?.[state.personalInfo.bodyGoal].toFixed(0) + ` kcal`
      })
      .addCase(fetchCalorieNeed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
});

export const {
  login,
  logout,
  selectGender,
  setUserBirthday,
  setShoulder,
  setWrist,
  setNeck,
  setChest,
  setArm,
  setForeArm,
  setWaist,
  setHip,
  setThigh,
  setCalve,
  setIdealMeasurements,
  setIdealWeight,
  setBodyType,
  setBodyFat,
  setActivityLevel,
  setBodyGoal,
  setCalorieNeed,
  setBMR,
  setAge,
  setWeight,
  setHeight,
  setInput,
  reset,
} = userSlice.actions;

export const userInfoSelector = (state) => state.user.personalInfo;
export default userSlice.reducer;
