const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user:'luctqps38844@gmail.com',
        pass:'pwaaxkzzzqyejgcr'
    }
});
module.exports = {transporter};