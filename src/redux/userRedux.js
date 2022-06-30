import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: "",
    isFetching: false,
    error: false,
    userGender: "",
    height: 169,
    weight: 60,
    idealWeight: [],
    bmi: "",
    age: 29,
    bodyType: "Ectomorph",
    bodyGoal: "maintain weight",
    bodyFat: "",
    measurements: {
      neckSize: 34,
      shoulderSize: "",
      chestSize: "",
      armSize: "",
      foreArmSize: "",
      wristSize: "",
      waistSize: 70,
      hipSize: 86,
      thighSize: "",
      calveSize: "",
    },
    idealMeasurements: {
      idealWristSize: 15,
      idealNeckSize: "",
      idealShoulderSize: "",
      idealChestSize: "",
      idealArmSize: "",
      idealForeArmSize: "",
      idealWaistSize: "",
      idealHipSize: "",
      idealThighSize: "",
      idealCalveSize: "",
    },
    activityLevel: "level_1",
    calorieNeed: "",
  },
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setWeight: (state, action) => {
      state.weight = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setNeck: (state, action) => {
      state.measurements.neckSize = action.payload;
    },
    setWaist: (state, action) => {
      state.measurements.waistSize = action.payload;
    },
    setHip: (state, action) => {
      state.measurements.hipSize = action.payload;
    },
    setBodyType: (state, action) => {
      state.bodyType = action.payload;
    },
    setIdealWeight: (state, action) => {
      if (state.bodyType === "Ectomorph") {
        state.idealWeight = action.payload.map((item) =>
          Math.round((item * 96) / 100)
        );
      } else if (state.bodyType === "Endomorph") {
        state.idealWeight = action.payload.map((item) =>
          Math.round((item * 104) / 100)
        );
      } else {
        state.idealWeight = action.payload.map((item) => Math.round(item));
      }
      state.bmi = (
        (state.weight / (state.height * state.height)) *
        10000
      ).toFixed(1);
    },
    selectGender: (state, action) => {
      state.userGender = action.payload;
    },
    setWristSize: (state, action) => {
      state.idealMeasurements.idealWristSize = action.payload * 1;
    },
    setIdealMeasurements: (state, action) => {
      state.idealMeasurements.idealChestSize = Math.round(
        state.idealMeasurements.idealWristSize * 6.5
      );
      state.idealMeasurements.idealNeckSize = Math.round(
        state.idealMeasurements.idealChestSize * 0.37
      );
      state.idealMeasurements.idealArmSize = Math.round(
        state.idealMeasurements.idealChestSize * 0.36
      );
      state.idealMeasurements.idealForeArmSize = Math.round(
        state.idealMeasurements.idealChestSize * 0.29
      );
      state.idealMeasurements.idealWaistSize = Math.round(
        state.idealMeasurements.idealChestSize * 0.7
      );
      state.idealMeasurements.idealHipSize = Math.round(
        state.idealMeasurements.idealChestSize * 0.85
      );
      state.idealMeasurements.idealThighSize = Math.round(
        state.idealMeasurements.idealChestSize * 0.53
      );
      state.idealMeasurements.idealCalveSize = Math.round(
        state.idealMeasurements.idealChestSize * 0.34
      );
      state.idealMeasurements.idealShoulderSize = Math.round(
        state.idealMeasurements.idealWaistSize * 1.61
      );
    },
    setBodyFat: (state, action) => {
      state.bodyFat = action.payload;
    },
    setActivityLevel: (state, action) => {
      state.activityLevel = action.payload;
    },
    setBodyGoal: (state, action) => {
      state.bodyGoal = action.payload;
    },
    setCalorieNeed: (state, action) => {
      state.calorieNeed = action.payload;
    },
    reset: (state) => {},
  },
});

export const {
  selectGender,
  setWristSize,
  setIdealMeasurements,
  setUser,
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
  setNeck,
  setWaist,
  setHip,
  reset,
} = userSlice.actions;

export default userSlice.reducer;
