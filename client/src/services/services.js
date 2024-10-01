import axios from "axios";

const API_URL = process.env(REACT_APP_API_URL);
const IDEAL_WEIGHT_URL = `${API_URL}/ideal-weight`;
const DAILY_CALORIE_URL = `${API_URL}/daily-calorie`;
const BODY_FAT_URL = `${API_URL}/body-fat`;

export const getIdealWeight = async (data) => {
  const response = await axios.get(IDEAL_WEIGHT_URL);
  return response.data;
};
export const getDailyCalorie = async (data) => {
  const response = await axios.get(DAILY_CALORIE_URL);
  return response.data;
};
export const getBodyFat = async (data) => {
  const response = await axios.get(BODY_FAT_URL);
  return response.data;
};
