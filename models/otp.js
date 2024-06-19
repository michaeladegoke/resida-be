const mongoose = require("mongoose");

const OTPSchema = mongoose.Schema({
     email: { type: String },
     code: { type: String },
     type: { type: String},
     created_at: { type: Date },
     otpExpiresAt: { type: Date}
}); 

module.exports = mongoose.model("OTP", OTPSchema);