const axios = require("axios");
const FATSECRET_AUTH_URL = "https://oauth.fatsecret.com/connect/token";
const FATSECRET_BASE_URL = "https://platform.fatsecret.com/rest/server.api";
const clientID = process.env.FATSECRET_CLIENT_ID;
const clientSecret = process.env.FATSECRET_CLIENT_SECRET;
let cachedToken = null;
let tokenExpirationTime = null;
//search food//
const searchFoodRequest = async (query) => {
  await getToken();
  const method = "foods.search";
  const format = "json";
  let page_number;
  let max_results;

  const url = `${FATSECRET_BASE_URL}?method=${method}&search_expression=${encodeURIComponent(query)}&format=${format}`;
  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${cachedToken.access_token}`,
          Host: "platform.fatsecret.com",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

//GET FATSECRET TOKEN WITH MY DEVELOPER ACCOUNT//
const getToken = async () => {
  //check if token expired//

  if (cachedToken && tokenExpirationTime > Date.now()) {
    return cachedToken;
  }
  const options = {
    method: "post",
    url: "https://oauth.fatsecret.com/connect/token",
    auth: {
      username: clientID,
      password: clientSecret,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: "grant_type=client_credentials&scope=basic",
  };

  try {
    const response = await axios(options);
    const token = response.data;
    cachedToken = token;
    tokenExpirationTime = Date.now() + token.expires_in * 1000 - 60000;
    return token; // Token'i döndürüyoruz.
  } catch (error) {
    throw new Error(error);
    // res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  searchFoodRequest,
  getToken,
};
