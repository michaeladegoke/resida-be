// const userModel = require("../models/users");
// const otpModel = require("../models/otp");
// const { userSignUpMsg, signUpOtp } = require("../utils/emails/auth");


// const StatusCode = require("../utils/statusCode");
// const { generateToken, generateOtp } = require("../utils/generateTokens");
// const bcrypt = require("bcrypt");


// const getOTP = async (req, res, next) => {
//     const { email } = req.body;

//     const OTP = await generateOtp();
//     console.log(OTP);

//     //const user = await userRepo.saveUser(data);

//     await otpModel.create({
//         email: email,
//         otp: OTP,
//         type: "Signup",
//         created_at: new Date(),
//         otpExpiresAt: Date.now() + 5 * 60 * 1000
//     });

//     //send mail
//     await signUpOtp(email, OTP);

//     return res.status(StatusCode.CREATED).json({
//         status: true,
//         msg: "check email for otp sent",
//     });
// };


// const resendOTP = async (req, res, next) => {
//     const { email } = req.body;
    
//     const otpExist = await otpModel.findOneByEmail({email:email});
      
//        await otpModel.deleteMany({email:otpExist?.email});


//        //generate another otp
//        const OTP = await generateOtp();
   
//        await otpModel.create({
//            email: email,
//            otp: OTP,
//            type: "Signup",
//            created_at: new Date(),
//            otpExpiresAt: Date.now() + 5 * 60 * 1000
//        });
    
//          //send mail
//        await signUpOtp(email, OTP);

//        return res.status(StatusCode.CREATED).json({
//         status: true,
//         msg: "check email for otp resent to you",
//     });
// };

// const validateOTP = async (req, res) => {
//     const { email, code } = req.body;

//     const otpExist = await otpModel.findOne({code:code});
    
//     if(!otpExist){
//         return res.status(StatusCode.BAD_REQUEST).json({
//             status: false,
//             message: "Invalid OTP"
//         });
//     }

//     if (otp.email != email) {
//         return res.status(StatusCode.BAD_REQUEST).json({
//             status: false,
//             message: "Invalid credentials"
//         });
//     }

//     await otpModel.deleteOne({code:code});

//     return res.status(StatusCode.ok).json({
//         status: true,
//         message: "OTP succesfully Validated",
//     }); 
          
// };

// const signUp = async(req, res, next) => {
//     const { email, password } = req.body;

//     if(!email) {
//         return res.status(StatusCode.BAD_REQUEST).json({
//             status: false,
//             message: "Email is required"
//         });
//         //run everything
//     } 

//     if(!password) {
//         return res.status(StatusCode.BAD_REQUEST).json({
//             status: false,
//             message: "Password is required"
//         });
//         //run everything
//     } 

//     const salt = await bcrypt.genSaltSync(10);

//     const hashedPassword = await bcrypt.hashSync(password, salt);

//     //console.log(hasshedPassword);


//     const saveUser = await userModel.create({
//         email: email,
//         password:  hashedPassword
//     });

//     await userSignUpMsg(email);

//     return res.status(StatusCode.CREATED).json({
//         status: true,
//         msg: "account created succesfully",
//         userDetails: saveUser,
//     });
// };


// const signIn = async (req, res, next) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(StatusCode.BAD_REQUEST).json({
//             status: false,
//             msg: "Email and password are required",
//         });
//     }

//     const userExist = await userModel.findOne({ email: email });
//     console.log (userExist.first_name);

//     if (!userExist) {
//         return res.status(StatusCode.BAD_REQUEST).json({
//             status: false,
//             msg: "User account not found, please sign up",
//         });
//     }

//     if (!userExist.password) {
//         return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
//             status: false,
//             msg: "User account password is missing or invalid",
//         });
//     }


//     const passwordMatch = bcrypt.compareSync(password, userExist.password);

//     if (!passwordMatch) {
//         return res.status(StatusCode.BAD_REQUEST).json({
//             status: false,
//             msg: "Incorrect password",
//         });
//     }

//     return res.status(StatusCode.CREATED).json({
//         status: true,
//         msg: "Welcome to Resida",
//         data: {
//             userExist,
//             // Include any tokens or additional data here
//         },
//     });
// };







// module.exports = { signUp, signIn, getOTP, resendOTP, validateOTP };

const userModel = require("../models/users");
const otpModel = require("../models/otp");
const { userSignUpMsg, signUpOtp } = require("../utils/emails/auth");
const StatusCode = require("../utils/statusCode");
const { generateToken, generateOtp } = require("../utils/generateTokens");
const bcrypt = require("bcrypt");

const getOTP = async (req, res, next) => {
    const { email } = req.body;
    const OTP = await generateOtp();
    console.log(OTP);

    await otpModel.create({
        email: email,
        otp: OTP,
        type: "Signup",
        created_at: new Date(),
        otpExpiresAt: Date.now() + 5 * 60 * 1000
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

    const OTP = await generateOtp();

    await otpModel.create({
        email: email,
        otp: OTP,
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
    const otpExist = await otpModel.findOne({ otp: code });

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

    await otpModel.deleteOne({ otp: code });

    return res.status(StatusCode.OK).json({
        status: true,
        message: "OTP successfully validated",
    });
};

const signUp = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            message: "Email is required"
        });
    }

    if (!password) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            message: "Password is required"
        });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const saveUser = await userModel.create({
        email: email,
        password: hashedPassword
    });

    await userSignUpMsg(email);

    return res.status(StatusCode.CREATED).json({
        status: true,
        msg: "Account created successfully",
        userDetails: saveUser,
    });
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

    return res.status(StatusCode.CREATED).json({
        status: true,
        msg: "Welcome to Resida",
        data: {
            userExist,
        },
    });
};

module.exports = { signUp, signIn, getOTP, resendOTP, validateOTP };
