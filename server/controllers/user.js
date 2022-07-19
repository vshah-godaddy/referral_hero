const UserModel = require('../models/user');
const constants = require('../config/constants');
const {filteredBody} = require('../utils/filterBody');
const {sendEmail} = require('../config/sendgrid');
const {sendOTPMessage} = require('../config/twilio.js');


async function generateOTP() {  
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    }
    return OTP;
} 

async function sendOTPviaEmail(sapId){
    let user = await UserModel.checkUser(null,sapId);
    if(user){
        let OTP = await generateOTP();
        console.log("OTP>>",OTP);
        let msgDetails = {
            otp:OTP,
            toEmail:user.email,
        }
        await UserModel.addOtp(user._id,OTP);
        let result = await sendEmail(msgDetails);
        if(result){
            return true;
        }else{
            throw("Sendgrid Error (Network problem)");
        }  
    }else{
        throw "User Not Found";
    }
}

async function sendOTPviaPhoneNo(sapId){
    let user = await UserModel.checkUser(null,sapId);
    if(user){
        let OTP = await generateOTP();
        console.log("OTP>>",OTP);
        await UserModel.addOtp(user._id,OTP);
        let result = await sendOTPMessage(OTP,`+91${user.phoneNo}`);
        if(result){
            return true;        
        }else{
            return "Twilio Error (Network problem)";
        }
    }else{
        throw "User Not Found";
    }
}

module.exports = {
    async createUser(req,res,next){
        try{
            let body = filteredBody(req.body,constants.WHITELIST.users.register);
            let user = await UserModel.createUser(body);
            await UserModel.createPassword(user.sap_id,"init@123");
            return res.success("User Added");
        }catch(e){
            return res.error(e);
        }
    },
    
    async login(req,res,next){
        try{
            let body  = filteredBody(req.body,constants.WHITELIST.users.login);
            let user = await UserModel.authenticateUser(body.sap_id,body.password);
            return res.success("Login Successfull",user);
        }catch(e){
            return res.error(e);
        }
    },

    async changePassword(req,res,next){
        try{
            let body = filteredBody(req.body,constants.WHITELIST.users.password.change);
            if(body.password ===body.confirmPassword){
                await UserModel.changePassword(body);
                return res.success("Password Change Successfull");
            }else{
                return res.error("Password And Confirm Password should Match");
            }
        }catch(e){
            return res.error(e);
        }
    },

    async sendOTP(req,res,next){
        try{
            let body = filteredBody(req.body,constants.WHITELIST.users.sendOTP);
            if(body.email){
                await sendOTPviaEmail(body.sap_id)
            }else if(body.phoneNo){
                await sendOTPviaPhoneNo(body.sap_id);
            }
            return res.success("OTP Sent");
        }catch(e){
            return res.error(e);
        }
    },

    async verifyOTP(req,res,next){
        try{
            let body ={
                sap_id:req.body.sapId,
                otp:req.body.otp
            }
            let result = await UserModel.verifyOTP(body);
            if(result){
                return res.success("OTP Verified!!");
            }else{
                throw "Cant verify otp";
            }
        }catch(e){
            return res.error(e);
        }
    },

};