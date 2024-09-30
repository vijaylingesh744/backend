const PostReaction = require("../modal/PostReaction");
let Validator = require("validatorjs");

exports.AddPostReaction = async (req, res) => {
    try {
        const { post_id, reaction_type, reacted_by } = req.body;

        // Find existing reaction
        const existingReaction = await PostReaction.findOne({ post_id, reacted_by });
        if (existingReaction) {
            await existingReaction.remove();
            return res.json({ message: 'Reacted removed successfully', status: true, data: newPostReaction });
        }else{
        const newPostReaction = new PostReaction({
            post_id,
            reaction_type, // 1 for like, 2 for dislike, etc.
            reacted_by
        });
        await newPostReaction.save();
        return res.json({ message: 'Reacted successfully', status: true, data: newPostReaction });
    }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', status: false, error: error.message });
    }
};

exports.ListPostReaction = async (req, res) => {
    const items = await PostReaction.find();
    // res.json(items);
    return res.json({ message: 'Listed successfully', status:true,data:items });
};

exports.DeletePostReaction = async (req, res) => {
    try {
        const item = await PostReaction.findById(req.params.itemId);
        if(!item) {
            return res.status(404).json({ message: 'PostReaction not found' });
        }
        // Add logic to check ownership or permissions
        await PostReaction.findByIdAndDelete(req.params.itemId);
        res.json({ message: 'PostReaction deleted successfully',status:true });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error',status:false,err:err });
    }
};

exports.UpdatePostReaction = async (req, res) => {
    try {
        const item = await PostReaction.findById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'PostReaction not found' });
        }
        // Add logic to check ownership or permissions
        await PostReaction.findByIdAndUpdate(req.params.itemId, {
        post_id: req.body.post_id,
        reaction_type: req.body.reaction_type, // 1 for like, 2 for dislike, etc.
        reacted_by:req.body.reacted_by
        });
        res.json({ message: 'PostReaction updated successfully', status:true });
    } catch(err){
        res.status(500).json({ message: 'Internal server error', status:false });
    }
};