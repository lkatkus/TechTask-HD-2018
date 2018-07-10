const mongoose = require('mongoose');

const User = mongoose.model('User', {
    id: {
        type: Number
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = {
    User
};