const Coupon = require("../modal/Coupon");
let Validator = require("validatorjs");

exports.AddCoupon = async (req, res) => {
  
  try{
    const newCoupon = new Coupon({
        title: req.body.title,
        valid_from: req.body.valid_from,
        valid_to: req.body.valid_to,
        value: req.body.value,
        country: req.body.country,
    });
    await newCoupon.save();

    res.json({ message: 'Coupon stored successfully',status:true,data:newCoupon });
} catch(err){
    res.status(500).json({ message: 'Internal server error' });
}
};

exports.ListCoupon = async (req, res) => {
 
  try{
    const page = parseInt(req.query.page) || 1; // Default page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit 10
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    // Find documents with pagination
    const items = await Coupon.find().skip(skip).limit(limit);

    // Count total documents
    const totalCount = await Coupon.countDocuments();

    return res.status(200).send({
        status: true,
        message: "Coupon listed successfully",
        data: items,
        pagination: {
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            totalItems: totalCount
        }
    });
} catch(err){
    res.status(500).json({ message: 'Internal server error' });
}
};

exports.DeleteCoupon = async (req, res) => {
    try {
        const item = await Coupon.findById(req.params.itemId);
        if(!item) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        // Add logic to check ownership or permissions
        await Coupon.findByIdAndDelete(req.params.itemId);
        res.json({ message: 'Coupon deleted successfully',status:true });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.UpdateCoupon = async (req, res) => {
    try {
        const item = await Coupon.findById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        // Add logic to check ownership or permissions
        await Coupon.findByIdAndUpdate(req.params.itemId, {
            title: req.body.title,
            valid_from: req.body.valid_from,
            valid_to: req.body.valid_to,
            value: req.body.value,
            country: req.body.country,
        });
        res.json({ message: 'Coupon updated successfully',status:true });
    } catch(err){
        res.status(500).json({ message: 'Internal server error' });
    }
};