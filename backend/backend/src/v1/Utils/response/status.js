const crypto = require('./crypto');

exports.errorResponse = function (Success, Message, response) {
    response.status(400).send({
        success: Success,
        message: Message,
    })
}

exports.successResponse = function (Success, Data, response) {
    // const encryptedRes = crypto.encrypt(Data);
    response.json({
        success: Success,
        data: Data,
        // encryptedResponse: encryptedRes
    })
}