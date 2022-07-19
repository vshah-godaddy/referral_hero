const router = require("express").Router();
const UserController = require('../controllers/user');
const {verify} = require('../auth/auth');

router.post(
    '/register',
    UserController.createUser
);

router.post(
    '/login',
    UserController.login
);

router.get(
    '/check/verification',
    verify,
    (req,res,next)=>{
        console.log(req.userId);
        res.success("Success");
    }
);

router.post(
    '/send/otp',
    UserController.sendOTP
);

router.post(
    '/otp/verify',
    UserController.verifyOTP
);

router.post(
    '/password/change',
    UserController.changePassword
);
module.exports = router;