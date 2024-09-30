
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const CryptoJS = require("crypto-js");
let useragent = require('express-useragent');

/**
 * @param {*} req 
 * @param {*} userData 
 * @returns 
 * @desc : generate token function - create access token for user - Using jsonwebtoken
 */

const generateToken = async function (req, userData, newSessionId) {
    let userAgent = useragent.parse(req.headers['user-agent']);
    try {
        let cipher = CryptoJS.AES.encrypt('' + userData._id, config.SECRET_KEY); //Encrypt user ID
        cipher = cipher.toString();

        const token = jwt.sign({
            user: cipher,
            sessionId: newSessionId,
            browser: userAgent.browser,
            os: userAgent.os,
            platform: userAgent.platform,
        }, config.JWT_SALT, { expiresIn: '15d' });

        return token;
    } catch (err) {
        console.log("\n\n\n\n\n\n err", err)
    }
}

/**
 * @param {*} plainText 
 * @returns Encrypt plain text 
 */
    const encryptCipher = async function (plainText) {
    const encryptedCipherValue = CryptoJS.AES.encrypt(plainText, config.cryptoKey);
    
    return encryptedCipherValue.toString();
}

/**
 * @param {*} encryptedText 
 * @returns Decrypt encrypted value
 */
const decryptCipher = async function (encryptedText) {
    const decryptCiphervalue = CryptoJS.AES.decrypt(encryptedText, config.cryptoKey);
    
    return decryptCiphervalue.toString(CryptoJS.enc.Utf8);
}

module.exports = { generateToken, encryptCipher, decryptCipher }