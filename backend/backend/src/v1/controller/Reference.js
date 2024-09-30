const Reference = require("../modal/Reference");
let Validator = require("validatorjs");
const responseHandlier = require('../Utils/response/status');

exports.AddReference = async (req, res) => {
    
  const newReference = new Reference({
    company: req.body.company,
    description: req.body.description,
    ref_email: req.body.ref_email,
    ref_full_name: req.body.ref_full_name,
    ref_phone: req.body.ref_phone,
    rt_number: req.body.rt_number,
    user_id: req.body.user_id,
   });

   await newReference.save();
   return res.json({ message: 'reacted successfully', status:true,data:newReference });
};

exports.ListReference = async (req, res) => {
    const items = await Reference.find();
    // res.json(items);
    return res.json({ message: 'Listed successfully', status:true,data:items });
};

exports.DeleteReference = async (req, res) => {
    try {
        const item = await Reference.findById(req.params.itemId);
        if(!item) {
            return res.status(404).json({ message: 'Reference not found',status:false });
        }
        await Reference.findByIdAndDelete(req.params.itemId);
        res.json({ message: 'Reference deleted successfully',status:true });
    } catch (err) {
        return responseHandlier.errorResponse(false,err.message, res);
    }
};

exports.UpdateReference = async (req, res) => {
    try {
        const item = await Reference.findById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'Reference not found' });
        }
        // Add logic to check ownership or permissions
        await Reference.findByIdAndUpdate(req.params.itemId, {
          company: req.body.company,
          description: req.body.description,
          ref_email: req.body.ref_email,
          ref_full_name: req.body.ref_full_name,
          ref_phone: req.body.ref_phone,
          rt_number: req.body.rt_number,
          user_id: req.body.user_id,
        });
        res.json({ message: 'Reference updated successfully', status:true });
    } catch(err){
        return responseHandlier.errorResponse(false,err.message, res);
    }
};