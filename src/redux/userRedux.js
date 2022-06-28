import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: "",
    isFetching: false,
    error: false,
    userGender: "",
    height: "",
    weight: "",
    idealWeight: [],
    bmi: "",
    age: "",
    bodyType: "",
    bodyGoal: "",
    measurements: {
      neckSize: "",
      shoulderSize: "",
      chestSize: "",
      armSize: "",
      foreArmSize: "",
      wristSize: "",
      waistSize: "",
      hipSize: "",
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
    activityLevel: "",
    calorieNeed: {
      bmr: "",
      maintainWeight: "",
      mildWeightLoss: "",
      weightLoss: "",
      extremeWeightLoss: "",
      mildWeightGain: "",
      weightGain: "",
      extremeWeightGain: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
    setIdealWeight: (state, action) => {
      if (state.bodyType === "Ectomorph") {
        state.idealWeight = action.payload.map((item) =>
          Math.round((item * 96) / 100)
        );
      } else if (state.bodyType === "Ectomorph") {
        state.idealWeight = action.payload.map((item) =>
          Math.round((item * 104) / 100)
        );
      } else {
        state.idealWeight = action.payload.map((item) => Math.round(item));
      }
      //   state.idealWeight = action.payload;
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
  },
});

export const {
  selectGender,
  setWristSize,
  setIdealMeasurements,
  setUser,
  setIdealWeight,
} = userSlice.actions;

export default userSlice.reducer;
