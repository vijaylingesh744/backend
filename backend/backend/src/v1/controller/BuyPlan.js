const SubTransaction = require("../modal/SubTransaction");
let Validator = require("validatorjs");
const responseHandlier = require('../Utils/response/status');

exports.AddSubTransaction = async (req, res) => {
  
  try{
    const rules = {
        // title: "required",
        // price: "required",
        // description: "required",
        // validity_month: "required",
        // admin_id: "required"
        user_id:'required',
        Sub_id:'required',
        valid_from:'required',
        valid_to:'required',
        payment:'required'
    };
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
        return responseHandlier.errorResponse(false, "Please send mandatory fields", res);
    }
    const newSubTransaction = new SubTransaction(req.body);
    await newSubTransaction.save();

    res.json({ message: 'SubTransaction stored successfully',status:true,data:newSubTransaction });
} catch(err){
    return responseHandlier.errorResponse(false,err.message, res);
}
};

exports.ListSubTransaction = async (req, res) => {
  try{
    const page = parseInt(req.query.page) || 1; // Default page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit 10
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    // Find documents with pagination
    const items = await SubTransaction.find().skip(skip).limit(limit);

    // Count total documents
    const totalCount = await SubTransaction.countDocuments();
    return res.status(200).send({
        status: true,
        message: "SubTransaction listed successfully",
        data: items,
        pagination: {
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            totalItems: totalCount
        }
    });
    // const items = await SubTransaction.find();
    // res.json({ message: 'SubTransaction Listed successfully',status:true,data:items });
} catch(err){
    return responseHandlier.errorResponse(false,err.message, res);
}
};

exports.DeleteSubTransaction = async (req, res) => {
    try {
        const item = await SubTransaction.findById(req.params.itemId);
        if(!item) {
            return res.status(404).json({ message: 'SubTransaction not found' });
        }
        // Add logic to check ownership or permissions
        await SubTransaction.findByIdAndDelete(req.params.itemId);
        res.json({ message: 'SubTransaction deleted successfully',status:true });
    } catch (err) {
        return responseHandlier.errorResponse(false,err.message, res);
    }
};

exports.UpdateSubTransaction = async (req, res) => {
    try {
        const item = await SubTransaction.findById(req.params.itemId);
        if (!item) {
          return responseHandlier.errorResponse(false,'SubTransaction not found', res);
        }
        await SubTransaction.findByIdAndUpdate(req.params.itemId, req.body);
        res.json({ message: 'SubTransaction updated successfully',status:true });
    } catch(err){
        return responseHandlier.errorResponse(false,err.message, res);
    }
};