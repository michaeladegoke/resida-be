const nodemailer = require("nodemailer");
const { PASSMAILER, USER, SERVICE } = require("../../config/envconfig"); 



exports.userSignUpMsg = async (email, first_name) => {

    try {
        const transporter = nodemailer.createTransport({
            service: SERVICE,
            secure: true,
            auth: {
              pass: PASSMAILER,
              user: USER,          
    },
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
console.log("email sent succesfully");
    } catch (error) {
        console.log(error, "email not sent");
    }    
}