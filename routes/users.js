const express = require("express");
const router = express.Router();
//const {authValidation, otpValidation} = require("../validations/userValidation");

const usersController = require("../controllers/users")

console.log(usersController);


router.post("/otp", /*otpValidation,*/ usersController.getOTP);
router.post("/otp/resend", /*otpValidation,*/ usersController.resendOTP);
router.put("/validate/otp", /*otpValidation,*/ usersController.validateOTP);


router.post("/signup", /*authValidation,*/ usersController.signUp);
router.post("/signin", /*authValidation,*/ usersController.signIn);


module.exports = router;