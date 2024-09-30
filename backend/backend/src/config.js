const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();

const ENV = process.env.NODE_ENV || 'development';
const config = {
    TIMEZONE: process.env.TIMEZONE,
    MONGO_URI: process.env.MONGO_URI,
    LOG_TYPE: ENV == 'development' ? 'dev' : 'common',
    API_VERSION: process.env.API_VERSION,
    API_PORT: process.env.API_PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY,
    JWT_SALT: process.env.JWT_SALT,
};

module.exports = config;