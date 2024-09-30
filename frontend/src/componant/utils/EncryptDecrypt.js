import CryptoJS from 'crypto-js';

const secretKey = 'your-secret-key'; // Replace with your own secret key

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (ciphertext) => {
  if(ciphertext){
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }else{
    return ""
  }
};