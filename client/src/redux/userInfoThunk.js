import { createAsyncThunk } from "@reduxjs/toolkit";
import { calculateMeasurements } from "../utils/calculateMeasurements";
import { convertActivityLevel, convertActivityLevelForMacro } from "../utils/convertActivityLevel";
import { fitnessRequest } from "../requestMethods";
import { convertBodyGoalForMacro } from "../utils/convertBodyGoalStatus";

export const fetchIdealWeight = createAsyncThunk(
    'user/fetchIdealWeight',
    async (_, { getState }) => {
        const { gender, height } = getState().user.data.personalInfo;
        const response = await fitnessRequest.get(
            `/idealweight?gender=${gender}&height=${height}`
        );
        const sortedValues = Object.values(response.data.data)
            .map((item) => item)
            .sort((a, b) => a - b);

        return sortedValues;
    }
);

export const fetchBodyFat = createAsyncThunk(
    "user/fetchBodyFat",
    async (_, { getState }) => {
        const { neck, waist, hip } = getState().user.data.measurements
        const { age, weight, height, gender } = getState().user.data.personalInfo;
        const response = await fitnessRequest.get(
            `/bodyfat?age=${age}&gender=${gender}&weight=${weight}&height=${height}&neck=${neck}&waist=${waist}&hip=${hip}`
        );

        return response.data.data;
    }
);

export const fetchCalorieNeed = createAsyncThunk(
    "user/fetchCalorieNeed",
    async (_, { getState }) => {
        const { height, weight, age, activityLevel, gender } = getState().user.data.personalInfo;
        const activityLevelApiValue = await convertActivityLevel(activityLevel)
        const response = await fitnessRequest.get(
            `/dailycalorie?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${activityLevelApiValue}`
        );

        return response.data.data;
    }
);

export const fetchMacroNeed = createAsyncThunk(
    "user/fetchMacroNeed",
    async (_, { getState }) => {
        const { height, weight, age, gender, activityLevel, bodyGoal } = getState().user.data.personalInfo;
        const activityLevelApiValue = await convertActivityLevelForMacro(activityLevel)
        const bodyGoalApiValue = await convertBodyGoalForMacro(bodyGoal)
        const response = await fitnessRequest.get(
            `macrocalculator?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${activityLevelApiValue}&goal=${bodyGoalApiValue}`
        )
        return response.data.data;
    }
);

export const updateIdealMeasurements = createAsyncThunk(
    'user/updateIdealMeasurements',
    async (_, { getState, dispatch }) => {
        const { wrist } = getState().user.data.measurements;
        const { gender } = getState().user.data.personalInfo;
        const idealMeasurements = await calculateMeasurements(wrist, gender);

        return idealMeasurements;
    }
);

// export const setMeasurements = createAsyncThunk(
//     'user/setMeasurements',
//     async (values) => {
//         return values
//     }
// )