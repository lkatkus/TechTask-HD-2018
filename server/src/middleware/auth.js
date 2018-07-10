const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const salt = 'mysalt';

const generateToken = (user) => {
    let data = {
        id: user.id
    };

    let token = jwt.sign(data, salt);

    return token;
}

const authenticate = (req, res, next) => {
    let token = req.headers.authtoken;  
    if(token){
        jwt.verify(token, salt, (err, decoded) => {
            if(decoded.id === Number(req.params.userId)){
                next();
            }else{
                res.status(401).send();
            }
        });        
    }else{
        res.status(401).send();
    }
};


const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10)
        .then((hash) => {
            resolve(hash);
        })
        .catch(() => {
            reject();
        })
    })
}

const checkPassword = (password, hash, user) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash)
        .then((match) => {
            if(match){
                resolve(user);
            }else{
                throw new Error('Wrong password.');
            }
        })
        .catch((err) => {
            reject(err);
        })
    })
}

module.exports = {
    generateToken,
    authenticate,
    hashPassword,
    checkPassword
};