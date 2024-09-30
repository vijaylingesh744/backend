
const url = require('url');

function getBaseUrl(urlString) {
    const parsedUrl = new URL(urlString);
    return `${parsedUrl.protocol}//${parsedUrl.hostname}/`;
}

const urlString = 'https://www.example.com/products/index.html';
const baseUrl = getBaseUrl(urlString);


function generateRandomUsername() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const usernameLength = 10; // Random length between 5 and 20 characters
    let username = '';

    for (let i = 0; i < usernameLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        username += characters[randomIndex];
    }

    return username;
}

const generateOTP = () => {
    const randomNum = Math.floor(Math.random() * 1000000);
    // Convert the random number to a string and pad it with leading zeros to make it 6 digits long
    const otp = String(randomNum).padStart(6, '0');
  
    return otp;
};

module.exports = {
genrate:generateRandomUsername,
generateotp:generateOTP
}