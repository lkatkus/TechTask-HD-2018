// --------- IMPORTS ---------
    // Dependencies
    const express = require('express');
    const cors = require('cors');
    const {ObjectId} = require('mongodb');
    const bodyParser = require('body-parser');

    // Custom modules
    const {generateToken, authenticate, hashPassword, checkPassword} = require('./middleware/auth');
    
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
// --------- END SETUP ---------

// --------- ROUTING ---------
app.get('/', (req, res) => {
    // Check if logged in
    // Redirect to login page if failed
    // Redirect to reminder list if pass
});

const generateUserId = (hashedPassword) => {
    return new Promise((resolve, reject) => {   
        User.find().sort({id:-1}).limit(1)
        .then((user) => {
            if(user.length !== 0){
                resolve({
                    hashedPassword,
                    id: user[0].id + 1
                });
            }else{
                resolve({
                    hashedPassword,
                    id: 1
                });
            }
        })
        .catch((err) => {
            reject('Unable to connect to database.');
        })
    })
};

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
            text: req.body.text,
            createdAt: new Date().getTime()
        });

        newReminder.save()
        .then(() => {
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
                    return reminder.createdAt <= req.query.to;
                });
            };

            res.status(200).send(reminders);
        })
        .catch((err) => {
            res.status(400).send();
        })
    });

    // Update reminder
    app.patch('/user/:userId/reminder', authenticate, (req, res) => {
        res.send('update reminder');
    });

    // Delete reminder
    app.delete('/user/:userId/reminder/:reminderId', authenticate, (req, res) => {
        res.send('update reminder');
    });

    // Send email
    app.post('/user/:userId/reminder/:reminderId/send', authenticate, (req, res) => {
        res.send('send reminder email');
    });
// --------- END ROUTING ---------

app.listen('8000', () => {
    console.log('Server on PORT 8000');
});

