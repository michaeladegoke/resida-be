const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/envconfig");
const otpGenerator = require("otp-generator");



exports.generateToken = async (user) => {
    const token = await jwt.sign(
        {
             _id: user._id,
             email: user.email,
             phone: user.phone,
        },
        JWT_SECRET,
        {
            //expiresIn: "6d", max of 7days
            expiresIn: "3d",
        },
    );
    return token;
    };





    exports.generateOTP = async() => {
        const OTP = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        return OTP;
    }
