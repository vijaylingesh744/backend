const PagePost = require("../modal/PagePost")
const Page = require("../modal/Page")
const responseHandlier = require('../Utils/response/status');
const imageUpload = require('../Utils/ImageUpload');
var formidable = require("formidable");
const { default: mongoose } = require("mongoose");
const { RemoveImage } = require('../Utils/ImageFunc');
exports.AddPagePost = async(req,res)=>{
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const reqdata = JSON.parse(fields.data);
            var file = await imageUpload(files.mediaUrls);
            if(file?.length>1){
                file = file
            }else{
                file = [file]
            }
            if (reqdata.media_type != 0 && !file) {
                return res.status(406).json({
                    message: "Please send mandatory fields",
                    status: false
                });
            }
            const { page_id } = reqdata;
            const page = await Page.findById(page_id);
            if (!page) {
                return res.status(404).json({
                    message: "Page not found",
                    status: false
                });
            }
            const newPagePost = new PagePost({
                posted_by: reqdata.posted_by,
                description: reqdata.description,
                media_type: reqdata.media_type,
                date_time: new Date(),
                media_url: file, // Assuming media_url is the field to store URLs
                status: 0,
                page_id:page._id
            })
            await newPagePost.save()
            return res.status(200).send({
                status: true,
                message: "PagePost created successfully",
                data: newPagePost,
            });
        })
    }catch(err){
        res.status(500).json({ status:false, error: err.message });

    }
}

exports.ListPostByPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit 10
    const skip = (page - 1) * limit
  
    var items = await PagePost.aggregate([
        {
            $match:{
                page_id:mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
          $lookup:{
            from:'users',
            localField:'posted_by',
            foreignField:'_id',
            as:'users'
          },
        },
        {
            $unwind: '$users'
        },
        {
            $lookup: {
              from: 'postreactions',
              localField: '_id',
              foreignField: 'post_id',
              as: 'reaction'
            }
        },
        {
            $lookup: {
                from: 'postreactions',
                let: { postId: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$post_id', '$$postId'] }
                        }
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'reacted_by',
                            foreignField: '_id',
                            as: 'reactedUsers'
                        }
                    },
                    { $unwind: '$reactedUsers' }
                ],
                as: 'reaction'
            }
        },
        {
            $lookup: {
                from: 'comments',
                let: { postId: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$post_id', '$$postId'] }
                        }
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'commented_by',
                            foreignField: '_id',
                            as: 'CommentUsers'
                        }
                    },
                    { $unwind: '$CommentUsers' }
                ],
                as: 'CommentUsers'
            }
        },
        { $skip: skip },
        { $limit: limit },
        {
            $sort: { createdAt: -1 }  
        }
    ]).exec()

    const totalCount = await PagePost.countDocuments();
    return res.status(200).send({
        status: true,
        message: "Post listed successfully",
        data: items,
        pagination:{
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            totalItems: totalCount
        }
    });
};

exports.deletepagepost=async(req,res)=>{
    try{
        const pagepost = await PagePost.findById(req.params.id);
        if (!pagepost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        pagepost?.media_url?.map(async(image)=>await RemoveImage(image));
        // Add logic to check ownership or permissions
        await PagePost.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.UpdatepagePost = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const reqdata = JSON.parse(fields.data);
            const { id, posted_by, description,page_id,media_type,media_url} = reqdata;
            if (id) {
                const existingPost = await PagePost.findById(id);
                if (existingPost) {
                    existingPost.posted_by = posted_by || existingPost.posted_by;
                    existingPost.description = description || existingPost.description;
                    existingPost.media_type = media_type || existingPost.media_type;
                    existingPost.date_time = new Date(); // Update date
                    existingPost.media_url = media_url || existingPost.media_url;
                    existingPost.page_id=page_id
                    existingPost.edited = 1;
                    await existingPost.save();
                    return res.status(200).json({
                        status: true,
                        message: "Post updated successfully",
                        data: existingPost,
                    });
                } else {
                    return res.status(404).json({
                        status: false,
                        message: "Post not found"
                    });
                }
            } else {
                return res.status(400).json({
                    status: false,
                    message: "ID is required"
                });
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};