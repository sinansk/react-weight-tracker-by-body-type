import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../requestMethods";
import { calculateMeasurements } from "../utils/calculateMeasurements";
import { setIdealMeasurements } from "./userRedux";

export const fetchIdealWeight = createAsyncThunk(
    'user/fetchIdealWeight',
    async (_, { getState }) => {
        const { gender, height } = getState().user.personalInfo;
        const response = await publicRequest.get(
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
        const { age, weight, height, neck, waist, hip, gender } = getState().user.personalInfo;
        const response = await publicRequest.get(
            `/bodyfat?age=${age}&gender=${gender}&weight=${weight}&height=${height}&neck=${neck}&waist=${waist}&hip=${hip}`
        );
        return response.data.data;
    }
);

export const fetchCalorieNeed = createAsyncThunk(
    "user/fetchCalorieNeed",
    async (_, { getState }) => {
        const { height, weight, age, activityLevel, gender } = getState().user.personalInfo;
        const response = await publicRequest.get(
            `/dailycalorie?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${activityLevel}`
        );
        return response.data.data;
    }
);

export const updateIdealMeasurements = createAsyncThunk(
    'user/setIdealMeasurements',
    async (_, { getState, dispatch }) => {
        const { wrist, gender } = getState().personalInfo;
        const idealMeasurements = calculateMeasurements(wrist, gender);

        // İdeal ölçümleri güncelleyin
        dispatch(setIdealMeasurements(idealMeasurements));

        // Burada farklı bir veritabanına istek gönderin veya başka bir eylem çağırabilirsiniz
        // Örneğin: dispatch(sendIdealMeasurementsToDatabase(idealMeasurements));

        // İşlem tamamlandığında geri dönüş değeri oluşturabilirsiniz (isteğe bağlı)
        return idealMeasurements;
    }
);