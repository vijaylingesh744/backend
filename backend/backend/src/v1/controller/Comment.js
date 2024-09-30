const Comments = require("../modal/Comments");
let Validator = require("validatorjs");
const { default: mongoose } = require("mongoose");
exports.AddComments = async (req, res) => {
    var data = await Comments.findOne({
        post_id: req.body.post_id,
        user_id: req.body.user_id,
        msg: { $regex: new RegExp(req.body.msg, 'i') }
    }).exec();

    if (data) {
        return res.json({
            status: false,
            message: "Comment already exists"
        });
    }else{
    const newComments = new Comments({
        post_id: req.body.post_id,
        user_id: req.body.user_id,
        commented_by: req.body.commented_by,
        msg: req.body.msg,
        date_time: new Date(),
    });
    await newComments.save();
    return res.status(200).send({
        status: true,
        message: "Post created successfully",
        data: newComments,
    });
}
};

exports.ListComments = async (req, res) => {
    try {
        const items = await Comments.aggregate([
            {
                $match: { post_id:mongoose.Types.ObjectId(req.params.id)} // Match comments by post_id
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'commented_by', // Assuming 'commented_by' in comments refers to 'users' collection's '_id'
                    foreignField: '_id',
                    as: 'user_data'
                }
            },
            {
                $unwind: "$user_data" // Deconstructs the 'user_data' array to output a document for each element
            }
        ]);

        res.json({
            message: 'Comments listed successfully',
            data: items,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while listing comments',
            error: error.message,
        });
    }
};

exports.DeleteComments = async (req, res) => {
    try {
        const item = await Comments.findById(req.params.itemId);
        if(!item) {
            return res.status(404).json({ message: 'Comments not found' });
        }
        await Comments.findByIdAndDelete(req.params.itemId);
        res.json({ message: 'Comments deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.UpdateComments = async (req, res) => {
    try {
        const item = await Comments.findById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'Comments not found' });
        }
        await Comments.findByIdAndUpdate(req.params.itemId, {
            post_id: req.body.post_id,
            user_id: req.body.user_id,
            msg: req.body.msg,
            edited: 1,
            date_time: new Date(),
            commented_by: req.body.commented_by
        });
        res.json({ message: 'Comments updated successfully' });
    }catch(err){
        res.status(500).json({ message: 'Internal server error' });
    }
};