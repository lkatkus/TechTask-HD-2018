const {User} = require('../models/user');

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

module.exports = {
    generateUserId
}