const PageFollowers = require("../modal/PageFollowers")
const Page = require("../modal/Page");
const PagePost = require("../modal/PagePost")
const User = require("../modal/User");
const responseHandlier = require('../Utils/response/status');
const KeyData = require('../Utils/Keyjson')
const { default: mongoose } = require("mongoose");
exports.AddPageFollowers = async (req,res)=>{
    try{    
        const page = await Page.findById(req.params.id)
        if(!page){
            return res.status(404).json({message:"Page not found"})
        }
        const existingFollower = await PageFollowers.findOne({
            page_id: mongoose.Types.ObjectId(req.params.id)
        }).exec();

        let nodeId;
        if (existingFollower) {
            nodeId = existingFollower.nodeId;
        } else {
            nodeId = KeyData.genrate();
        }

        var alreadyExists = await PageFollowers.findOne({
            $and: [
            { page_id: req.params.id },
            { 'user_data.user_id': req.body.user_id }
        ]}).exec();

        if (alreadyExists){
            res.json({ message: 'Page has been followed already', status: true, data: alreadyExists });
            return
        }
        var status = page.user_id == req.body.user_id?1:0;
        const pagefollower = new PageFollowers({
            page_id:req.params.id,
            user_data:req.body,
            status:status,
            nodeId:nodeId
        })
        await pagefollower.save()
        return responseHandlier.successResponse(true, pagefollower, res);

    }catch(err){
        res.status(500).json({ error:err.message});
    }
}

exports.ListPageFollowers = async (req,res)=>{
    try{
        const page = await Page.findById(req.params.id)
        const User = await Page.findOne({'user_data.user_id':req.params.user_id})
        if(!page){
            return res.status(404).json({message:"Page not found"})
        }
        if(!User){
            return res.status(404).json({message:"Profile not found"})
        }
        const pageFollowers = await PageFollowers.aggregate([
            { $match: { page_id: mongoose.Types.ObjectId(req.params.id) } },
            {
              $lookup: {
                from: 'users', // The collection name for user data
                localField: 'user_data.user_id',
                foreignField: '_id', // Assuming the user's ID is stored in the _id field
                as: 'userDetails'
              }
            },
            {
                $unwind: '$userDetails' // Assuming page_data is an array with single element after lookup
            }
          ]);

        var pagefollower = await PageFollowers.find({ page_id: req.params.id }).exec()
        var alreadyExists = await PageFollowers.findOne({
            $and: [
            { page_id: req.params.id },
            { 'user_data.user_id':req.params.user_id }
        ]}).exec();
        if (alreadyExists) {
            res.json({ message: 'page is being followed by you', status: true, data: alreadyExists,follower:pageFollowers });
        }
        else{
            res.json({ message: 'page is not being followed by you', status: false,follower:pageFollowers});
        }
    }catch(err){
        res.status(500).json({ error:err.message});
    }
}
exports.DeletePageFollowers = async (req, res) => {
    try {
        const PageFollowed = await PageFollowers.findById(req.params.id);
        if (!PageFollowed) {
            return res.status(404).json({ message: 'Page not followed' });
        }
        await PageFollowers.findByIdAndDelete(req.params.id);
        res.json({ message: 'Page follower Removed successfully', status: true });
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};


exports.UserFollowers = async (req,res)=>{
    try {
    const user_id = req.params.id;
    const GetData = await Page.aggregate([
        {
            $lookup: {
                from: 'pagefollowers',
                localField: '_id',
                foreignField: 'page_id',
                as: 'page_follow_data'
            }
        },
        {
            $lookup: {
                from: 'industries',
                localField: 'industry',
                foreignField: '_id',
                as: 'industry_data'
            }
        },
        {
            $unwind: {
                path: "$industry_data",
                preserveNullAndEmptyArrays: true  // Keeps documents even if no match is found
            }
        },
        {
            $addFields: {
                page_follow_data_id: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: "$page_follow_data",
                                as: "item",
                                cond: {
                                    $eq: ["$$item.user_data.user_id", mongoose.Types.ObjectId(user_id)]
                                }
                            }
                        },
                        0
                    ]
                },
                page_follow_Item: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: "$page_follow_data",
                                as: "item",
                                cond: {
                                    $eq: ["$$item.user_data.user_id", mongoose.Types.ObjectId(user_id)]
                                }
                            }
                        },
                        0
                    ]
                }
            }
        },
        {
            $addFields: {
                page_follow_data_id: "$page_follow_data_id._id"
            }
        },
        {
            $match: {
                'page_follow_data.user_data.user_id':  mongoose.Types.ObjectId(user_id) 
            }
        },
    ]).exec();
    
    res.json({ message: 'Users being followed by you', status: true, data: GetData });
} catch (err) {
    return responseHandlier.errorResponse(false, err.message, res);
}
}

exports.getFollowedPage = async( req,res)=>{
    try {
        const user_id = req.params.id;
        const page = await PageFollowers.find({"user_data.user_id":user_id})
        const pageIds = page.map(follow => follow.page_id);
        const posts = await PagePost.find({ page_id: { $in: pageIds } });
        // var items = await posts.aggregate([
        //     {
        //       $lookup:{
        //         from:'users',
        //         localField:'posted_by',
        //         foreignField:'_id',
        //         as:'users'
        //       },
        //     },
        //     {
        //         $unwind: '$users'
        //     },
        //     {
        //         $lookup: {
        //           from: 'postreactions',
        //           localField: '_id',
        //           foreignField: 'post_id',
        //           as: 'reaction'
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'postreactions',
        //             let: { postId: '$_id' },
        //             pipeline: [
        //                 {
        //                     $match: {
        //                         $expr: { $eq: ['$post_id', '$$postId'] }
        //                     }
        //                 },
        //                 {
        //                     $lookup: {
        //                         from: 'users',
        //                         localField: 'reacted_by',
        //                         foreignField: '_id',
        //                         as: 'reactedUsers'
        //                     }
        //                 },
        //                 { $unwind: '$reactedUsers' }
        //             ],
        //             as: 'reaction'
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'comments',
        //             let: { postId: '$_id' },
        //             pipeline: [
        //                 {
        //                     $match: {
        //                         $expr: { $eq: ['$post_id', '$$postId'] }
        //                     }
        //                 },
        //                 {
        //                     $lookup: {
        //                         from: 'users',
        //                         localField: 'commented_by',
        //                         foreignField: '_id',
        //                         as: 'CommentUsers'
        //                     }
        //                 },
        //                 { $unwind: '$CommentUsers' }
        //             ],
        //             as: 'CommentUsers'
        //         }
        //     },
        //     // { $skip: skip },
        //     // { $limit: limit },
        //     {
        //         $sort: { createdAt: -1 }  
        //     },
        // ]).exec()

        res.json({ message: 'Users being followed by you', status: true, data: posts });

    }
    catch(err){
        return responseHandlier.errorResponse(false, err.message, res);
    }
} 

exports.UserRequest = async (req, res) => {
    const user_id = req.params.id;
    const page_id = req.params.page_id;
    try {
        const followers = await PageFollowers.aggregate([
            {
                $lookup: {
                    from: "pages",
                    localField: "page_id",
                    foreignField: "_id",
                    as: "pageData"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user_data.user_id",
                    foreignField: "_id",
                    as: "Userdata"
                }
            },
            {
                $unwind: '$pageData' // Assuming pageData is an array with a single element after lookup
            },
            {
                $unwind: '$Userdata' // Assuming pageData is an array with a single element after lookup
            },
            {
                $match: {
                    "pageData.user_id": mongoose.Types.ObjectId(user_id),
                    "page_id": mongoose.Types.ObjectId(page_id),
                    "status": 0,
                    "$expr": {
                        "$ne": ["$user_data.user_id", mongoose.Types.ObjectId(user_id)]
                    }
                }
            }
        ]).exec();
        return res.json({ message: 'Users being followed by you', status: true, data: followers });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

exports.PageFollowUpdate = async (req,res)=>{
    const {id,status} = req.params;
    if(status == 1){
        const UpdateData =await PageFollowers.findByIdAndUpdate(id,{
            status:1
        });        
        return res.json({ message: 'page follower data Approved success fully ', status: true, data: UpdateData });
    }else{
        const UpdateData =await PageFollowers.findByIdAndDelete(id);
        return res.json({ message: 'page Follow rejected Successfully', status: true, data: UpdateData });
    }
}
// const PageUpdate = async () => {
//     try {
//         const updateData = await PageFollowers.updateMany(
//             { status: 0 },
//             { $set: { status: 1 } } // Corrected the update operation syntax and fixed the typo
//         );
//         console.log(updateData);
//     } catch (error) {
//         console.error("Error updating data:", error);
//     }
// };