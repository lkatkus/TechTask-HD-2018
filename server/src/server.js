// --------- IMPORTS ---------
    // Dependencies
    const express = require('express');
    const cors = require('cors');
    const {ObjectId} = require('mongodb');
    const bodyParser = require('body-parser');

    // Custom modules
    const {generateToken, authenticate, hashPassword, checkPassword} = require('./middleware/auth');
    const {generateUserId} = require('./db/utils/generateUserId');
    const {sendMail} = require('./utils/sendMail');

    // Database setup
    const {mongoose} = require('./db/mongoose');
    const {User} = require('./db/models/user');
    const {Reminder} = require('./db/models/reminder');
// --------- END IMPORTS ---------

// --------- SETUP ---------
    const app = express();

    // Middleware
    app.use(bodyParser.json());
    app.use(cors());
    app.options('*', cors());

    const PORT = process.env.PORT || 3000;
// --------- END SETUP ---------

// --------- ROUTING ---------
// --- USER ---
    // Create user
    app.post('/user', (req, res) => {
        let newUser = {};

        User.findOne({name: req.body.username})
        .then((user) => {
            if(!user){
                return hashPassword(req.body.password)
            }else{
                throw new Error('Username already in use.');
            }
        })
        .then((hashedPassword) => {
            return generateUserId(hashedPassword)
        })
        .then((userData) => {
            newUser = new User({
                id: userData.id,
                name: req.body.username,
                email: req.body.email,
                password: userData.hashedPassword
            });
            newUser.save();
        })
        .then(() => {
            res.status(200).send();
        })
        .catch((err) => {
            res.status(400).send(err.message);
        })
    });
    
    // Login
    app.post('/user/login', (req, res) => {
        User.findOne({name: req.body.username})
        .then((user) => {
            if(user){
                return checkPassword(req.body.password, user.password, user);
            }else{
                throw new Error('User not found.');
            }
        })
        .then((user) => {
            res.status(200).send({
                id: user.id,
                name: user.name,
                token: generateToken(user)
            });
        })
        .catch((err) => {
            res.status(401).send(err.message);
        })
    });

// --- REMINDER ---
    // Create reminder
    app.post('/user/:userId/reminder', authenticate, (req, res) => {

        let newReminder = new Reminder({
            creator: req.params.userId,
            title: req.body.title,
            text: req.body.text,
            deadline: req.body.deadline,
            createdAt: new Date().getTime()
        });

        newReminder.save()
        .then((addedReminder) => {
            return Reminder.find({
                creator: req.params.userId
            })
        })
        .then((reminders) => {
            res.status(200).send(reminders);
        })
        .catch((err) => {
            res.status(400).send();
        })
    });

    // Get all user reminders
    app.get('/user/:userId/reminder', authenticate, (req, res) => {
        Reminder.find({
            creator: req.params.userId
        })
        .then((reminders) => {
            // Filter reminders if filtering query is passed
            if(req.query.from){
                reminders = reminders.filter((reminder) => {
                    return reminder.createdAt >= req.query.from;
                });
            };
            if(req.query.to){
                reminders = reminders.filter((reminder) => {
                    return reminder.deadline <= req.query.to;
                });
            };
            res.status(200).send(reminders);
        })
        .catch((err) => {
            res.status(400).send();
        })
    });

    // Update reminder
    app.patch('/user/:userId/reminder/:reminderId', authenticate, (req, res) => {
        Reminder.findOneAndUpdate({
            _id: req.params.reminderId,
            creator: req.params.userId           
        }, { $set: {title: req.body.title, text: req.body.text}})
        .then((reminder) => {
            if(reminder){
                // Get all reminders after updating
                return Reminder.find({
                    creator: req.params.userId
                })                
            }else{
                throw new Error('Unable to update reminder.');
            }
        })
        .then((reminders) => {
            res.status(200).send(reminders);
        })
        .catch((err) => {
            res.status(400).send(err.message);
        })        
    });

    // Delete reminder
    app.delete('/user/:userId/reminder/:reminderId', authenticate, (req, res) => {
        Reminder.findOneAndRemove({
            _id: req.params.reminderId,
            creator: req.params.userId
        })
        .then((reminder) => {
            if(reminder){
                // Get all remaining reminders
                return Reminder.find({
                    creator: req.params.userId
                })                
            }else{
                throw new Error('Unable to delete reminder.');
            }
        })
        .then((reminders) => {
            res.status(200).send(reminders);
        })
        .catch((err) => {
            res.status(400).send(err.message);
        })
    });

    // Send email
    app.post('/user/:userId/reminder/:reminderId/send', authenticate, (req, res) => {
                
        Reminder.findOne({
            _id: req.params.reminderId,
            creator: req.params.userId           
        })
        .then((reminder) => {
            if(reminder){
                sendMail(reminder);
                res.status(200).send();
            }else{
                throw new Error('Unable to send reminder.');
            }
        })
        .catch((err) => {
            res.status(400).send(err.message);
        }) 
    });
// --------- END ROUTING ---------

app.listen(PORT, () => {
    console.log(`Server up on ${PORT}`)
});

