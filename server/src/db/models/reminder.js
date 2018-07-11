const mongoose = require('mongoose');

const Reminder = mongoose.model('Reminder', {
    creator: {
        type: String
    },
    title: {
        type: String
    },
    text: {
        type: String
    },
    createdAt: {
        type: Number
    }
});

module.exports = {
    Reminder
};