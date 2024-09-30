const Projects = require("../modal/Projects");
let Validator = require("validatorjs");

exports.AddProjects = async (req, res) => {
    const newPostReaction = new Projects({
        user_id: req.body.user_id,
        bp_id: req.body.bp_id,
        user_type:req.body.user_type,
        title:req.body.title,
        designation:req.body.designation,
        commission_type:req.body.commission_type,
        commission_value:req.body.commission_value,
    });
    await newPostReaction.save();
   return res.json({ message: 'stored successfully', success:true,data:newPostReaction });
};

exports.listProject = async (req, res) => {
    const user_id = req.params.id
    const newPostReaction = await Projects.find({bp_id:user_id}).exec();
   return res.json({message: 'listed successfully', success:true,data:newPostReaction });
};

exports.getProject = async (req, res) => {
    const newPostReaction = await Projects.findById({_id:req.params.id}).exec();
    return res.json({message: 'listed successfully', success:true,data:newPostReaction });
};

exports.UpdateProject = async (req, res) => {
    try {
       var Projectdata = await Projects.findByIdAndUpdate(req.params.id, {
        StageId:req.params.StageId,
        });
        res.json({ message: 'updated successfully', status:true ,data:Projectdata});
    } catch(err){
        return responseHandlier.errorResponse(false,err.message, res);
    }
};