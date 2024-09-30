const jwt = require('jsonwebtoken');
const SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const ACCESS_TOKEN_EXPIRE_MINUTES = 30;

// Middleware to decode JWT token
function decodeJwtToken(token) {
    return jwt.verify(token, SECRET_KEY);
}

// Middleware to get current user from token
exports.getCurrentUser = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = decodeJwtToken(token);
        req.currentUser = decodedToken;
        next();
    }catch(err) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

exports.createJwtToken = (payload) => {
    const secretKey = SECRET_KEY; // Replace this with your secret key
    const options = {
        expiresIn: '3650d' // Token expiration time
    };
    // Create and return the JWT token
    return jwt.sign(payload, secretKey, options);
};