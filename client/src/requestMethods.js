import axios from "axios";
const BASE_URL = "https://fitness-calculator.p.rapidapi.com/";

const KEY = process.env.REACT_APP_FITNESS_KEY;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-rapidapi-key": KEY,
    "X-rapidapi-host": `fitness-calculator.p.rapidapi.com`,
  },
});


export const fatSecretAuth = async () => {
  const clientID = process.env.REACT_APP_FATSECRET_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_FATSECRET_CONSUMER_SECRET;

  const options = {
    method: 'POST',
    url: 'https://oauth.fatsecret.com/connect/token',
    auth: {
      username: clientID,
      password: clientSecret,
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': 'http://localhost:3000', // İzin verilen kaynak
    },
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'basic',
    }).toString(),
  };
  try {
    const response = await axios(options);
    console.log(response.data);
    return response
  } catch (error) {
    console.error(error);
    return error
  }
};
