require('dotenv').config();
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASS,
    },
});
exports.sendMail = async (dests, subject, text, html) => {
    // send mail with defined transport object
    const mailOptions = {
        from: '"UoSM SEG System" <youquanneu4@gmail.com>', // sender address
        to: dests,        // list of receivers
        subject: subject, // Subject line
        text: text,       // plain text body
        html: html,       // html body
    };
    const info = await transporter.sendMail(mailOptions, (err, inf) => {
        if (err) return console.log("ERR: ", err);
        console.log('Message sent: ', inf.messageId, inf.response);
        console.log(dests);
        return inf;
    });
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    return info;
};

// exports.otpVerification()


exports.createOTP = () => {
    const otp = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    });
    console.log(otp);
    return otp;
};

// I lack skill
exports.storeOTP = (otp) => {
    process.env.OTP = otp;
};
exports.verifyOTP = (otp) => {
    // console.log('otp stored is ',process.env.OTP);
    return process.env.OTP == otp;
};
exports.clearOTP = () => {
    process.env.OTP = undefined;
};

// https://stackoverflow.com/questions/55805264/how-to-store-time-based-otp-secret-key-in-mysql
// this.sendMail("lqypublic@gmail.com","OTP for Signing Up ✔","text","<b>Hello world HTML 3</b>").catch(console.error);
