require('dotenv').config();



module.exports = {
    MONGO_URL:process.env.MONGO_URL_DEV,
    sendGridApiKey:process.env.SEND_GRID_API_KEY,
    twilioAccountSid : process.env.TWILIOACCOUNTSID,
    twilioAuthToken : process.env.TWILIOAUTHTOKEN,
}