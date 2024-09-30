const Post = require("../modal/Post");
let Validator = require("validatorjs");
const imageUpload = require('../Utils/ImageUpload');
const formidable = require('formidable');
const  KeyData = require('../Utils/Keyjson')
const Scrap = require('../modal/Scrap')
const { default: mongoose } = require("mongoose");
const BusinessInfo = require("../modal/BusinessInfo");
const User = require("../modal/User");
const PagePost = require("../modal/PagePost")
const { RemoveImage } = require('../Utils/ImageFunc');
const Page = require("../modal/Page");
const PageFollowers = require("../modal/PageFollowers");

exports.AddPost = async (req, res) => {
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
            const newPost = new Post({
                posted_by: reqdata.posted_by,
                description: reqdata.description,
                media_type: reqdata.media_type,
                tags: reqdata.tags,
                date_time: new Date(),
                media_url: file, // Assuming media_url is the field to store URLs
                status: 0
            });

            await newPost.save();
            return res.status(200).send({
                status: true,
                message: "Post created successfully",
                data: newPost,
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.ListPost = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default page 1
        const limit = parseInt(req.query.limit) || 10; // Default limit 10
        const skip = (page - 1) * limit;

        let FollowId = [];
        let userExists = 0;

        if (req.query.user_id) {
            const userExist = await Post.find({ posted_by: mongoose.Types.ObjectId(req.query.user_id) }).exec();
            userExists = userExist.length;

            const followPageId = await PageFollowers.find({ 'user_data.user_id': mongoose.Types.ObjectId(req.query.user_id)}).exec();
            FollowId = followPageId.map(item => item.page_id);
        }
        
        const items = await PagePost.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'posted_by',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $unwind: { path: '$users', preserveNullAndEmptyArrays: true }
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
                    from: 'pages',
                    localField: 'page_id',
                    foreignField: '_id',
                    as: 'pagesData'
                }
            },
            {
                $unwind: { path: '$pagesData', preserveNullAndEmptyArrays: true }
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
                        {
                            $unwind: { path: '$CommentUsers', preserveNullAndEmptyArrays: true }
                        }
                    ],
                    as: 'comments'
                }
            },
            {
                $match: {
                    "page_id": { $in: FollowId }
                }
            }
        ]).unionWith({
            coll: 'posts',
            pipeline: [
                {
                    $lookup: {
                        from: 'users',
                        localField: 'posted_by',
                        foreignField: '_id',
                        as: 'users'
                    }
                },
                {
                    $unwind: { path: '$users', preserveNullAndEmptyArrays: true }
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
                            {
                                $unwind: { path: '$CommentUsers', preserveNullAndEmptyArrays: true }
                            }
                        ],
                        as: 'comments'
                    }
                },
            ]
        }).sort({ createdAt: -1 }) // Sort after union
          .skip(skip)
          .limit(limit)
          .exec();
        

        const totalCount = await Post.countDocuments();

        return res.status(200).send({
            status: true,
            message: "Post listed successfully",
            data: items,
            exists: userExists,
            pagination: {
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                totalItems: totalCount
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            status: false,
            message: "An error occurred",
            error: err.message
        });
    }
};

exports.RecommendedPost= async (req,res)=>{
    try{
        const userId = req.query.user_id;
        const clientUserArr = await BusinessInfo.findOne({ user_id: mongoose.Types.ObjectId(userId)}).exec();
        const mergedArray = clientUserArr.area_of_interest || [];
        const dataArr = JSON.stringify(mergedArray.map(item=>item.title));
        const data =await GetArrInterestUser(dataArr);

        const looped = data.map(item=>item.user_id)

        var items = await Post.aggregate([
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
            {
                $sort: { createdAt: -1 }  
            },
            // { $skip: skip },
            // { $limit: limit },
            {
                $match:{posted_by:{$in:looped}}
            }
        ]).exec()

        return res.status(200).send({
            status: true,
            message: "Post listed successfully",
            data: items})

    }catch(err){
        console.log(err);
        return err
    }
}

const jaccardSimilarity = (setA, setB) => {
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return intersection.size / union.size;
};

async function GetArrInterestUser(title) {
  
    var bpUsers = await User.aggregate([
        {
            $lookup:{
              from:'posts',
              localField:'_id',
              foreignField:'posted_by',
              as:'Posts'
            },
          },
          {
              $unwind: '$Posts'
          },

    ]).exec();
    const bpUserIds = bpUsers.map(user => user._id);
    const bpUserArr = await BusinessInfo.find({user_id: { $in: bpUserIds }}).exec();
    var userdata = [];
    const titleSet = new Set(JSON.parse(title));
    bpUserArr.forEach(item => {
      const interestSet = new Set(item.area_of_interest.map(interest => interest.title));
      const similarity = jaccardSimilarity(titleSet, interestSet);
      if (similarity >= 0.50) { 
        userdata.push({
          user_id: item.user_id,
          similarity: similarity 
        });
      }
    });

    userdata.sort((a, b) => b.similarity - a.similarity);
    return userdata;
}

exports.UserPost = async (req, res) => {
    try{
    const page = parseInt(req.query.page) || 1; // Default page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit 10
    const skip = (page - 1) * limit
    var items = await Post.aggregate([
    {
        $lookup: {
            from: 'users',
            localField: 'posted_by',
            foreignField: '_id',
            as: 'users'
        }
    },
    {
        $unwind: '$users'
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
    {
        $match: { posted_by: mongoose.Types.ObjectId(req.query?.user_id) }
    },
    { $limit: limit },
    { $skip: skip },
    {
        $sort: { updatedAt: -1 }
    },
   
]).exec();


    const totalCount = await Post.countDocuments();
    var userExists =false;
    if (req.query.user_id) {
        userExists = await Post.findOne({posted_by:mongoose.Types.ObjectId(req.query?.user_id)}).exec()
    }
    return res.status(200).send({
        status: true,
        message: "Post listed successfully",
        data: items,
        exists:userExists?true:false,
        pagination:{
            totalPages:Math.ceil(totalCount / limit),
            currentPage:page,
            totalItems:totalCount
        }
    });
}catch(err){
    res.status(500).json({ message: err.message });
}
};

exports.RecallPost = async (req, res) =>{
    try{
        const timestamp = req.query.time
        console.log(timestamp)
        
        const parsedTimestamp = new Date(timestamp);
        console.log(parsedTimestamp)
        
        const newPostsExist = await Post.exists({ createdAt: { $gt: parsedTimestamp } });
        if(newPostsExist){
            res.status(200).json({status:true, newPosts: newPostsExist });
        }
        else{
            res.status(404).json({status:false, newPosts: newPostsExist })
        }
    } catch (err) {
        res.status(500).json({status:false, message: err.message });
    }
}

exports.DeletePost = async (req, res) => {
    try {
        const item = await Post.findById(req.params.itemId);
        const pagepost = await PagePost.findById(req.params.itemId);
        if(item){
            item?.media_url?.map(async(image)=>await RemoveImage(image));
            await Post.findByIdAndDelete(req.params.itemId);
        }else{
            pagepost?.media_url?.map(async(image)=>await RemoveImage(image));
            await PagePost.findByIdAndDelete(req.params.itemId);
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.UpdatePost = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const reqdata = JSON.parse(fields.data);
            const { id, posted_by, description, media_type, tags,media_url} = reqdata;
            if (id) {
                const existingPost = await Post.findById(id);
                const existingPostPage = await PagePost.findById(id);
                if (existingPost) {
                    // Update the existing post
                    existingPost.posted_by = posted_by || existingPost.posted_by;
                    existingPost.description = description || existingPost.description;
                    existingPost.media_type = media_type || existingPost.media_type;
                    existingPost.tags = tags || existingPost.tags;
                    existingPost.date_time = new Date(); // Update date
                    existingPost.media_url = media_url || existingPost.media_url;
                    existingPost.edited = 1;
                    await existingPost.save();
                    return res.status(200).json({
                        status: true,
                        message: "Post updated successfully",
                        data: existingPost,
                    });
                } else if (existingPostPage) {
                    existingPostPage.posted_by = posted_by || existingPostPage.posted_by;
                    existingPostPage.description = description || existingPostPage.description;
                    existingPostPage.media_type = media_type || existingPostPage.media_type;
                    existingPostPage.date_time = new Date(); // Update date
                    existingPostPage.media_url = media_url || existingPostPage.media_url;
                    existingPostPage.edited = 1;
                    await existingPostPage.save();
                    return res.status(200).json({
                        status: true,
                        message: "Post updated successfully",
                        data: existingPostPage,
                    });
                }else {
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

exports.ListScrap = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default page 1
        const limit = parseInt(req.query.limit) || 10; // Default limit 10
        const type = req.query.type; // Get user type from query parameter
        const title = req.query.title; // Get title from query parameter
        const location = req.query.location; // Get location from query parameter
        const query = {};

        if (type) {
            query.buyer_seller = type;
        }
        
        if (location) {
            query.country = { $regex: new RegExp(location, 'i') };
        }
        if (title) {
            const titleRegex = new RegExp(title, 'i');
            query.$or = [
                { title: { $regex: titleRegex } },
                { description: { $regex: titleRegex } }
            ];
        }
        const skip = (page - 1) * limit;
        const totalCount = await Scrap.countDocuments(query); // Get total count of scraps matching the query
        const ListScrap = await Scrap.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
    
        res.json({
            users: ListScrap,
            status: true,
            message: "Scraps listed successfully",
            pagination: {
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                totalItems: totalCount
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', status: false });
    }
    
};



