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
async function sendVerificationEmail(recipient_email) {
    const mailOptions = {
        from: '"Totem 🗿" <foo@example.com>', // sender address
        to: recipient_email,
        subject: "Verify your email", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
    };

    // send the email
    const transporter = await init();
    const result = await transporter.sendMail(mailOptions);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
    sendVerificationEmail
}
