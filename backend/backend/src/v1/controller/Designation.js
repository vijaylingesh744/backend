
let Validator = require("validatorjs");
const ObjectId = require('mongoose').Types.ObjectId;
const Designation =require("../modal/Designation");

exports.AddDesignation = async (req, res) => {
try {
    const { user_id, data } = req.body;   
    var updated ={}
    if(req.query?.update){
       var updated = await Designation.findOneAndUpdate(
            { user_id},
            { $set: {data}},
            { returnOriginal: false}
        );
    }else{
       var updated = new Designation(req.body)
       await updated.save()
    }
    const message = 'Updated successfully';
    return res.json({ message, status: true, data: updated});
} catch (err) {
    return res.status(500).json({ message: err.message, status: false });
}
};

exports.ListDesignation = async (req, res) => {
    try {
        const UserId = req.query.id;
        const businessCommunity = await Designation.find({ user_id: UserId});
        return res.json({ message: 'List of business community', status: true, data: businessCommunity})
    }catch(error){
        return res.status(500).json({ message: error.message, status: false });
    }
};




