const nodemailer = require('nodemailer');

const sendMail = (reminder) => {
        let transporter = nodemailer.createTransport({
            host: 'mail.katkus.eu',
            port: 587,
            secure: false,
            tls: {
                rejectUnauthorized:false
            },
            auth: {
                user: '', 
                pass: ''
            }
        });

        let mailOptions = {
            from: '"ReminderApp" <test@katkus.eu>',
            to: 'laimonas@katkus.eu',
            subject: reminder.title,
            text: reminder.text
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                return console.log(error);
            }
        });
};

module.exports = {
    sendMail
};