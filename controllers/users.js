const userModel = require("../models/users");
const otpModel = require("../models/otp");
const { userSignUpMsg, signUpOtp } = require("../utils/emails/auth");
const StatusCode = require("../utils/statusCode");
const { generateToken, generateOTP } = require("../utils/generateTokens");
const bcrypt = require("bcrypt");

const getOTP = async (req, res, next) => {
    const { email } = req.body;
    const OTP = await generateOTP();
    console.log(OTP);

    await otpModel.create({
        email: email,
        code: OTP,  // Change this line
        type: "Signup",
        created_at: new Date(),
        otpExpiresAt: new Date(Date.now() + 60 * 60 * 1000)  // Make sure this is a Date object
    });

    await signUpOtp(email, OTP);

    return res.status(StatusCode.CREATED).json({
        status: true,
        msg: "check email for otp sent",
    });
};

const resendOTP = async (req, res, next) => {
    const { email } = req.body;
    const otpExist = await otpModel.findOne({ email: email });

    if (otpExist) {
        await otpModel.deleteMany({ email: otpExist.email });
    }

    const OTP = await generateOTP();

    await otpModel.create({
        email: email,
        code: OTP,
        type: "Signup",
        created_at: new Date(),
        otpExpiresAt: Date.now() + 5 * 60 * 1000
    });

    await signUpOtp(email, OTP);

    return res.status(StatusCode.CREATED).json({
        status: true,
        msg: "check email for otp resent to you",
    });
};

const validateOTP = async (req, res) => {
    const { email, code } = req.body;
    console.log(`Received email: ${email}, code: ${code}, type of code: ${typeof code}`);

    try {
        //Convert the code to a string before querying
        const stringCode = String(code);
        console.log(`Query executed: otpModel.findOne({ code: ${stringCode} })`);

        const otpExist = await otpModel.findOne({ code: code });
        console.log(`OTP found: ${otpExist}`);

        if (!otpExist) {
            return res.status(StatusCode.BAD_REQUEST).json({
                status: false,
                message: "Invalid OTP"
            });
        }

        if (otpExist.email !== email) {
            return res.status(StatusCode.BAD_REQUEST).json({
                status: false,
                message: "Invalid credentials"
            });
        }

        await otpModel.deleteOne({ code: stringCode });

        return res.status(StatusCode.OK).json({
            status: true,
            message: "OTP successfully validated",
        });
    } catch (error) {
        console.error(`Error during OTP validation: ${error}`);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "An error occurred during OTP validation"
        });
    }
};


const signUp = async (req, res, next) => {
    const { email, password } = req.body;


    try {
        const normalizedEmail = email.trim().toLowerCase();

        const userExist = await userModel.findOne({ email: normalizedEmail });

        if (userExist) {
            return res.status(StatusCode.BAD_REQUEST).json({
                status: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const saveUser = await userModel.create({
            email: normalizedEmail,
            password: hashedPassword
        });

        await userSignUpMsg(normalizedEmail);

        return res.status(StatusCode.CREATED).json({
            status: true,
            message: "Account created successfully",
            userDetails: saveUser,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(StatusCode.BAD_REQUEST).json({
                status: false,
                message: "User already exists"
            });
        }

    }
};

const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "Email and password are required",
        });
    }

    const userExist = await userModel.findOne({ email: email });

    if (!userExist) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "User account not found, please sign up",
        });
    }

    if (!userExist.password) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            status: false,
            msg: "User account password is missing or invalid",
        });
    }

    const passwordMatch = bcrypt.compareSync(password, userExist.password);

    if (!passwordMatch) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "Incorrect password",
        });
    }

    //JWT
    const token = await generateToken(userExist);

    return res.status(StatusCode.CREATED).json({
        status: true,
        msg: "Welcome to Resida",
        data: {
            userExist,
            token
        },
    });
};

module.exports = { signUp, signIn, getOTP, resendOTP, validateOTP };
