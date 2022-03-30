const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    AUTHORIZED_USERNAME: process.env.AUTHORIZED_USERNAME, 
    AUTHORIZED_PASSWORD: process.env.AUTHORIZED_PASSWORD, 
    PORT : process.env.PORT || 3000
}