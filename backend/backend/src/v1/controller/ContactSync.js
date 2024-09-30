const ContactSync = require("../modal/ContactSync");
let Validator = require("validatorjs");
const responseHandlier = require('../Utils/response/status');

exports.AddContact = async (req, res) => {
    const reqdata = {
        ref_id: req.body.ref_id,
        phone: req.body.phone,
    };
        try{
            const newConnection = new ContactSync(reqdata);
            await newConnection.save();
            res.json({
                status: true,
                data: newConnection,
                message: 'ContactSync Added Successfully'
            });
        }catch(error){
            return responseHandlier.errorResponse(false,error.message, res);
        }
};