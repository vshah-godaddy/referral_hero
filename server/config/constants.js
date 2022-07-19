
const WHITELIST = {
    users:{
        register:['sap_id','name','surname','department','email','phoneNo','address','type'],
        login:['sap_id','password'],
        sendOTP:['email','phoneNo','sap_id'],
        password:{
            change:['password','confirmPassword','sapId'],
        }
    }
}

module.exports = {
    WHITELIST,
}