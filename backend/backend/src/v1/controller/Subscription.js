const Subscription = require("../modal/Subscription");
let Validator = require("validatorjs");
const responseHandlier = require('../Utils/response/status');

exports.AddSubscription = async (req, res) => {
  
  try{
    const rules = {
        title: "required",
        price: "required",
        description: "required",
        validity_month: "required",
        admin_id: "required"
    };
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
        return responseHandlier.errorResponse(false, "Please send mandatory fields", res);
    }
    const newSubscription = new Subscription(req.body);
    await newSubscription.save();

    res.json({ message: 'Subscription stored successfully',status:true,data:newSubscription });
} catch(err){
    return responseHandlier.errorResponse(false,err.message, res);
}
};

exports.ListSubscription = async (req, res) => {
  try{
    const page = parseInt(req.query.page) || 1; // Default page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit 10
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    // Find documents with pagination
    const items = await Subscription.find().skip(skip).limit(limit);

    // Count total documents
    const totalCount = await Subscription.countDocuments();
    return res.status(200).send({
        status: true,
        message: "Subscription listed successfully",
        data: items,
        pagination: {
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            totalItems: totalCount
        }
    });
    // const items = await Subscription.find();
    // res.json({ message: 'Subscription Listed successfully',status:true,data:items });
} catch(err){
    return responseHandlier.errorResponse(false,err.message, res);
}
};

exports.DeleteSubscription = async (req, res) => {
    try {
        const item = await Subscription.findById(req.params.itemId);
        if(!item) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        // Add logic to check ownership or permissions
        await Subscription.findByIdAndDelete(req.params.itemId);
        res.json({ message: 'Subscription deleted successfully',status:true });
    } catch (err) {
        return responseHandlier.errorResponse(false,err.message, res);
    }
};

exports.UpdateSubscription = async (req, res) => {
    try {
        const item = await Subscription.findById(req.params.itemId);
        if (!item) {
          return responseHandlier.errorResponse(false,'Subscription not found', res);
        }
        await Subscription.findByIdAndUpdate(req.params.itemId, req.body);
        res.json({ message: 'Subscription updated successfully',status:true });
    } catch(err){
        return responseHandlier.errorResponse(false,err.message, res);
    }
};