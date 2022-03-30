
const config =  require('../config.js');

const AUTHORIZED_USERNAME = config.AUTHORIZED_USERNAME;
const AUTHORIZED_PASSWORD = config.AUTHORIZED_PASSWORD;


exports.authorize = async (req, res, next) => {

    const user = req.headers.user;
    const password = req.headers.password;


    if (!user || !password) {
        const err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }




    if (user == AUTHORIZED_USERNAME && password == AUTHORIZED_PASSWORD) {
        next();
    } else {
        const err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }



}