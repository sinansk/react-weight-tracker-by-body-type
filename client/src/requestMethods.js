import axios from "axios";
const FITNESS_URL = "https://fitness-calculator.p.rapidapi.com/";
const API = "http://localhost:5000/api/";
const KEY = process.env.REACT_APP_FITNESS_KEY;
export const apiRequest = axios.create({
  baseURL: API
})
export const fitnessRequest = axios.create({
  baseURL: FITNESS_URL,
  headers: {
    "X-rapidapi-key": KEY,
    "X-rapidapi-host": `fitness-calculator.p.rapidapi.com`,
  },
});
