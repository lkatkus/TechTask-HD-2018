// --------- IMPORTS ---------
    // Dependencies
    const {mongoose} = require('mongoose');
    const nodemailer = require('nodemailer');
    const {User} = require('../db/models/user');
    const {mailClientSetup} = require('../../config');

// --------- SETUP ---------
const sendMail = (reminder) => {

    User.findOne({id: reminder.creator})
    .then((user) => {
        if(user){
            let transporter = nodemailer.createTransport({
                host: mailClientSetup.host,
                port: 587,
                secure: false,
                tls: {
                    rejectUnauthorized: false
                },
                auth: {
                    user: mailClientSetup.username, 
                    pass: mailClientSetup.password
                }
            });
        
            let mailOptions = {
                from: '"ReminderApp" <test@katkus.eu>',
                to: user.email,
                subject: `Reminder: ${reminder.title} (${reminder.deadline})`,
                text: `${user.name}, do not forget to\n${reminder.text}\nThis is a test message from rmbr.katkus.eu`
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    return console.log(error);
                }
            });            
        }
    })
    .catch((err) => {
        console.log('Error');
    })
};

module.exports = {
    sendMail
};