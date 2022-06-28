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
    idealMeasurements: {
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
    selectGender: (state, action) => {
      state.userGender = action.payload;
    },
  },
});

export const { selectGender } = userSlice.actions;

export default userSlice.reducer;
