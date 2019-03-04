const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer");

// returns the nodemailer transport
async function init() {
    // Generate test SMTP service account from ethereal.email
    const account = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    return transporter;
}

// sends a verification email
async function sendVerificationEmail(recipientEmail, verificationHash) {
    // create link to email verification page
    const host = (process.env.NODE_ENV === 'production')? '68.183.110.202' : 'localhost';
    const verificationPageUrl = 'http://' + host + '/email-verification?email=' + recipientEmail + '&hash=' + verificationHash;

    const mailOptions = {
        from: '"Totem 🗿" <noreply@totem.com>',
        to: recipientEmail,
        subject: 'Email Verification',
        text: verificationPageUrl,
        html: '<a href="' + verificationPageUrl + '">Click to verify your email</a>'
    };

    // send the email
    const transporter = await init();
    const result = await transporter.sendMail(mailOptions);

    // Preview only available when sending through an Ethereal account
    console.log('\'email verification\' email: ' + nodemailer.getTestMessageUrl(result));
}

// sends an email that contains the forgotten username
async function sendForgotUsernameEmail(recipientEmail, username) {
    const mailOptions = {
        from: '"Totem 🗿" <noreply@totem.com>',
        to: recipientEmail,
        subject: 'Forgot Username',
        text: 'Your username: ' + username,
        html: 'Your username: ' + username
    };

    // send the email
    const transporter = await init();
    const result = await transporter.sendMail(mailOptions);

    // Preview only available when sending through an Ethereal account
    console.log('\'forgot username\' email: ' + nodemailer.getTestMessageUrl(result));
}

module.exports = {
    sendVerificationEmail,
    sendForgotUsernameEmail
}
