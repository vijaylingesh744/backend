const CryptoJS = require("crypto-js");
const config = require('../../../config');

/**
 * @param {*} text 
 * @returns ciphertext
 */  

exports.encrypt = function (text) {
    try {
        // Encrypt
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(text), config.SECRET_KEY).toString();
        return ciphertext;
    } catch (error) {
        console.log("\n catch-error", error);
    }
}