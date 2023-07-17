require("dotenv").config();
const router = require("express").Router();
const request = require("request");

router.get('/', (req, res) => {
    const clientID = process.env.FATSECRET_CLIENT_ID;
    const clientSecret = process.env.FATSECRET_CLIENT_SECRET;
    const options = {
        method: 'POST',
        url: 'https://oauth.fatsecret.com/connect/token',
        auth: {
            user: clientID,
            password: clientSecret,
        },
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        form: {
            grant_type: 'client_credentials',
            scope: 'basic',
        },
        json: true,
    };

    request(options, (error, response, body) => {
        if (error) {
            throw new Error(error);
            // res.status(500).json({ error: 'An error occurred' });
        } else {
            console.log("body,", body);
        }
    });
});

module.exports = router;
