const Gictcode = require("../modal/Gictcode");
const responseHandlier = require('../Utils/response/status');

exports.AddCode = async (req, res) => {
    try {
        const newPage = new Gictcode(req.body);
        await newPage.save();
        responseHandlier.successResponse(true, newPage, res)
    } catch (err) {
        responseHandlier.errorResponse(false, err, res)
    }
}

exports.ListCode = async (req, res) => {
    try {
        const ListPage = await Gictcode.find({}).exec();
        responseHandlier.successResponse(true, ListPage, res)
    } catch (err) {
        responseHandlier.errorResponse(false, err, res)
    }
}
exports.UpdateCode = async (req, res) => {
    try {
        const UpdateCode = await Gictcode.findByIdAndUpdate(req.params.id,req.body).exec();
        responseHandlier.successResponse(true, UpdateCode, res)
    } catch (err) {
        responseHandlier.errorResponse(false, err, res)
    }
}

exports.DeleteCode = async (req, res) => {
    try {
        const DeleteCode = await Gictcode.findByIdAndDelete(req.params.id).exec();
        responseHandlier.successResponse(true, DeleteCode, res)
    } catch (err) {
        responseHandlier.errorResponse(false, err, res)
    }
}
exports.CheckCode = async (req, res) => {
    try {
        const CheckPage = await Gictcode.findOne({code:req.params.id}).exec();
        if(CheckPage){
            responseHandlier.successResponse(true, CheckPage, res)
        }else{
            responseHandlier.successResponse(false, CheckPage, res)
        }
    } catch (err) {
        responseHandlier.errorResponse(false, err, res)
    }
}
