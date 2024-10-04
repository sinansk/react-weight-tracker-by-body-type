import { createAsyncThunk } from "@reduxjs/toolkit";
import { calculateMeasurements } from "../utils/calculateMeasurements";
import {
  convertActivityLevel,
  convertActivityLevelForMacro,
} from "../utils/convertActivityLevel";
import { apiRequest, fitnessRequest } from "../requestMethods";
import { convertBodyGoalForMacro } from "../utils/convertBodyGoalStatus";

export const fetchIdealWeight = createAsyncThunk(
  "user/fetchIdealWeight",
  async (_, { getState }) => {
    const { gender, height, weight, bodyType } =
      getState().user.data.personalInfo;
    const response = await apiRequest.get(
      `/ideal-weight?gender=${gender}&height=${height}&weight=${weight}&bodyType=${bodyType}`
    );
    return response.data;
  }
);

export const fetchBodyFat = createAsyncThunk(
  "user/fetchBodyFat",
  async (_, { getState }) => {
    const { neck, waist, hip } = getState().user.data.measurements;
    const { age, weight, height, gender } = getState().user.data.personalInfo;
    const response = await apiRequest.get(
      `/body-fat?age=${age}&gender=${gender}&weight=${weight}&height=${height}&neck=${neck}&waist=${waist}&hip=${hip}`
    );
    return response.data.bodyFat;
  }
);

export const fetchMacroNeed = createAsyncThunk(
  "user/fetchMacroNeed",
  async (_, { getState }) => {
    const { height, weight, age, gender, activityLevel, bodyGoal } =
      getState().user.data.personalInfo;
    const activityLevelApiValue = await convertActivityLevel(activityLevel);
    const bodyGoalApiValue = await convertBodyGoalForMacro(bodyGoal);
    const response = await apiRequest.get(
      `macro-calculator?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activityLevel=${activityLevelApiValue}&goal=${bodyGoalApiValue}`
    );

    return response.data;
  }
);

export const updateIdealMeasurements = createAsyncThunk(
  "user/updateIdealMeasurements",
  async (_, { getState, dispatch }) => {
    const { wrist } = getState().user.data.measurements;
    const { gender } = getState().user.data.personalInfo;
    const response = await apiRequest.get(
      `ideal-measurements?gender=${gender}&wrist=${wrist}`
    );
    return response.data.idealMeasurements;
  }
);
