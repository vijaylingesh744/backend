const Industry = require("../modal/Industry");
let Validator = require("validatorjs");
const responseHandlier = require('../Utils/response/status');
const mongoose = require("mongoose");
exports.AddIndustry = async (req, res) => {
    const newIndustry = new Industry({
        title: req.body.title,
    });
    await newIndustry.save();
    // res.json(newIndustry);
    return responseHandlier.successResponse(true,  newIndustry, res);
};

exports.ListIndustry = async (req, res) => {
   try{
    const page = parseInt(req.query.page) || 1; // Default page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit 10
    const skip = (page - 1) * limit; // Calculate the number of documents to skip
    var items =[]
    if(true){
        items = await Industry.find({}).exec();
    }else{
         items = await Industry.find().skip(skip).limit(limit);
    }
    const totalCount = await Industry.countDocuments();

     var data ={
        data: items,
        pagination: {
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            totalItems: totalCount
        }
    };
    return responseHandlier.successResponse(true,data, res);

} catch (err) {
    return responseHandlier.errorResponse(false,err.message, res);
}
};

exports.DeleteIndustry = async (req, res) => {
    try {
        const item = await Industry.findById(req.params.itemId);
        if(!item) {
            return res.status(404).json({ message: 'Industry not found',status:false });
        }
        // Add logic to check ownership or permissions
        await Industry.findByIdAndDelete(req.params.itemId);
        return responseHandlier.successResponse(true,'Industry deleted successfully', res);

    } catch (err) {
        return responseHandlier.errorResponse(false,err.message, res);

    }
};

exports.UpdateIndustry = async (req, res) => {
    try {
        const item = await Industry.findById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'Industry not found' });
        }
        // Add logic to check ownership or permissions
        await Industry.findByIdAndUpdate(req.params.itemId, {
            title: req.body.title,
        });
        return responseHandlier.successResponse(true,  'Industry updated successfully', res);
    } catch(err){
        return responseHandlier.errorResponse(false,err.message, res);

    }
};
exports.ListIndustrybyId = async (req, res) => {
    try{
     const item = await Industry.findById(req.params.itemId);
     if (!item) {
        return res.status(404).json({ message: 'Industry not found' });
    }
    return responseHandlier.successResponse(true,  item, res);
 } catch (err) {
    return responseHandlier.errorResponse(false,err.message, res);
 }
 };


 