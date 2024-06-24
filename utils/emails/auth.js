const nodemailer = require("nodemailer");
const { PASSMAILER, USER, SERVICE } = require("../../config/envconfig");
const { transport } = require("winston");

exports.userSignUpMsg = async (email, first_name) => {
    const transporter = nodemailer.createTransport({
        service: SERVICE,
        auth: {
            user: USER,
            pass:  PASSMAILER
        }
    });

    await transporter.sendMail({
        from: USER,
        to: email,
        subject: "Thanks For Contacting",
        html: `<b> Hi </b></b>
          <p>
                We received your mail.....
          </p>
          
          </br>
          <b>
          
          <p>Best regards,</p>
          <p>RESIDA Team</p>
          </b>
          `,
     });

    //  console.log("email sent succesfully");
    // } catch (error) {
    //     console.log(error, "email not sent");
    // } 

};




















exports.signUpOtp = async(email, OTP) => {
    console.log(email,PASSMAILER);
   try {
      const transporter = nodemailer.createTransport({
         service: SERVICE,
         secure:true,
         auth: {
            user: USER,
            pass:  PASSMAILER
         },
      });

      await transporter.sendMail({
        from: USER,
        to: email,
        subject: "OTP Sent",
        html: `<b> Hi </b></b>
         <p>
               here is the otp sent to you to verify yourself ${OTP}.....
         </p>
         
         </br>
         <b>
         
         <p>Best regards,</p>
         <p>RESIDA Team</p>
         </b>
         `, 
       })
   }catch (error){
    console.log("error in sending mail", error);
   }
}