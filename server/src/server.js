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

let id = 1;

const generateUserId = () => {
    return id;
};

// --- USER ---
    // Create user
    app.post('/user', async (req, res) => {

        let newUser = {};
        
        id++;

        User.findOne({name: req.body.username})
        .then((user) => {
            if(!user){
                return hashPassword(req.body.password)
            }else{
                // res.send({error: 'Username already in use.'});
                throw new Error('Username already in use.');
            }
        })
        .then((hashedPassword) => {
            console.log('new user')
            newUser = new User({
                id: generateUserId(),
                name: req.body.username,
                email: req.body.email,
                password: hashedPassword
            });

            newUser.save();
        })
        .then(() => {
            console.log('NEW USER CREATED');
            res.status(200).send();
        })
        .catch((err) => {
            console.log(err.message);
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
                token: generateToken(user)
            });
        })
        .catch((err) => {
            res.status(401).send(err.toString());
        })
        
    });

    // Logout
    app.post('/user/logout', authenticate, (req, res) => {
        res.send('user logout route');
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

