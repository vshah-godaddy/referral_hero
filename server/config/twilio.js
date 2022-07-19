const {twilioAccountSid,twilioAuthToken} = require('./config');
const accountSid = twilioAccountSid;
const authToken = twilioAuthToken;
const client = require('twilio')(accountSid, authToken);


module.exports={

    async sendOTPMessage(OTP,mobileNo){
        try{
            let message = await client.messages
            .create({
                body: `${OTP} is your One Time Password(OTP) from Server. Please enter the OTP to continue registering.`,
                from: '+14783944016',
                to: mobileNo,
            })
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    },
}