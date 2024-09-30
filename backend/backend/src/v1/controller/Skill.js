const Skills = require("../modal/Skills");
let Validator = require("validatorjs");
const responseHandlier = require('../Utils/response/status');
const User = require("../modal/User")
const CompanyData = require("../modal/CompanyData")
const PersonalSkill = require('../modal/PersonalSkills')
const Chatlist = require("../modal/Chatlist");
const Page = require("../modal/Page");
const PageFollowers = require("../modal/PageFollowers");
const Posts = require("../modal/Post");
const { default: mongoose } = require("mongoose");

exports.AddSkills = async (req, res) => {
    const newskills = new Skills({
        Industry_id: req.body.Industry_id,
        skill: req.body.skill
    });
    await newskills.save();
    return responseHandlier.successResponse(true, newskills, res);
};

exports.ListSkills = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default page 1
        const limit = parseInt(req.query.limit) || 10; // Default limit 10
        const skip = (page - 1) * limit; // Calculate the number of documents to skip
        const Industry_id = req.params.id
        var items = []
        var totalCount = 0;
        if (Industry_id == 8) {
            items = await Skills.find({ status: "8" }).skip(skip).limit(limit);
            totalCount = 39000;
        } else {
            items = await Skills.find({ Industry_id }).skip(skip).limit(limit);
            totalCount = (await Skills.find({ Industry_id }).exec()).length
        }
        var data = {
            data: items,
            pagination: {
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                totalItems: totalCount
            }
        };
        return responseHandlier.successResponse(true, data, res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};

exports.DeleteSkills = async (req, res) => {
    try {
        const item = await Skills.findById(req.params.itemId);
        if (!item) {
            return responseHandlier.errorResponse(false, 'Skill not found', res);
        }
        await Skills.findByIdAndDelete(req.params.itemId);
        return responseHandlier.successResponse(true, 'Skill deleted successfully', res);

    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};

exports.UpdateSkill = async (req, res) => {
    try {
        const item = await Skills.findById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        await Skills.findByIdAndUpdate(req.params.itemId, {
            skill: req.params.skill,
        });
        return responseHandlier.successResponse(true, 'Skill update successfully', res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};

exports.filter_user = async (req, res) => {
    try {
        const { industry, location, search, area_of_interest, city, isgictc } = req.body;
        var ExistUser = [];
        const userID = req.query.user_id;
        if (userID) {
            var userData = await Chatlist.find({
                $or: [{ sender: userID }, { receive: userID }],
                status: 1
            }).exec();
            ExistUser = userData.flatMap(item => [item.sender, item.receive]);
        }
        const searchTerms = search ? search.split(/\s+/) : [];

        const query = {
            ...(searchTerms.length > 0 ? {
                $or: searchTerms.flatMap(term => [
                    { 'first_name': { $regex: new RegExp(term, 'i') } },
                    { 'last_name': { $regex: new RegExp(term, 'i') } }
                ])
            } : {}),
            ...(location ? { 'country': { $regex: new RegExp(location, 'i') } } : {}),
            ...(city ? { 'city': { $regex: new RegExp(city, 'i') } } : {}),
            ...(ExistUser.length > 0 ? { '_id': { $nin: ExistUser } } : {}),
        };

        var Overall = await User.find(query).exec();
        if (area_of_interest?.length > 0) {
            Overall = await CheckData(Overall, area_of_interest);
        }
        var data = {
            users: Overall,
            pagination: {
                totalPages: 1,
                currentPage: 1,
                totalItems: Overall?.length
            }
        };
        return responseHandlier.successResponse(true, data, res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err, res)
    }
}

exports.filter_pages = async (req, res) => {
    try {
        const { industry, location, search, area_of_interest, city, isgictc } = req.body;
        var user_id = req.query?.user_id
        const cityTerms = city ? city.split(/\s+/) : [];

        const query = {
            ...(cityTerms.length > 0 ? {
                $or: cityTerms.flatMap(term => [
                    { 'city': { $regex: new RegExp(term, 'i') } }
                ])
            } : {}),
            ...(industry ? { 'industry': industry } : {}),
            ...(area_of_interest && area_of_interest.length > 0 ? { 'area_of_interest': { $in: [area_of_interest] } } : {}),
            ...(search ? { 'title': { $regex: new RegExp(search, 'i') } } : {}),
            ...(location ? { 'location': { $regex: new RegExp(location, 'i') } } : {}),
            // ...(city ? { 'city': { $regex: new RegExp(city, 'i') } } : {}),
            ...(user_id ? { 'page_follow_data.user_data.user_id': { $ne: mongoose.Types.ObjectId(user_id) } } : {}),
        };
        if (isgictc) {
            query['titleduplicate'] = { $regex: /GICTC/i };
        } else {
            query['titleduplicate'] = { $not: { $regex: /GICTC/i } };
        }
        var pipeline = [
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
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    titleduplicate: "$title"
                }
            },
            {
                $match: query
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
        ];
        list = await Page.aggregate(pipeline).exec();
        return responseHandlier.successResponse(true, list, res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err, res);
    }
}

exports.filter_user_connection = async (req, res) => {
    try {
        const { location, user_type, skills } = req.body;
        const regex = new RegExp(location, 'i'); // 'i' flag for case-insensitive matching
        var Overall = await User.find({
            $or: [
                { city: { $regex: regex } },
                { country: { $regex: regex } },
                { state: { $regex: regex } }
            ],
            user_type: user_type
        }).exec();
        if (skills.length) {
            Overall = await CheckData(Overall, skills);
        }
        var data = {
            users: Overall,
            pagination: {
                totalPages: 1,
                currentPage: 1,
                totalItems: Overall?.length
            }
        };
        return responseHandlier.successResponse(true, data, res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err, res)
    }
}



const CheckData = async (userList, skillList) => {
    const matchedUsers = [];
    for (const item of userList) {
        const DataItem = await PersonalSkill.findOne({ user_id: item._id }).exec();
        if (DataItem) {
            const hasMatch = skillList.some(skill =>
                DataItem.area_of_interest.some(interest =>
                    new RegExp(skill, 'i').test(interest.title)
                )
            );
            if (hasMatch) {
                matchedUsers.push(item);
            }
        }
    }

    return matchedUsers;
}

exports.CompanyData = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default page 1
        const limit = parseInt(req.query.limit) || 10; // Default limit 10
        // const regex = new RegExp(req.query.location, 'i'); // 'i' flag for case-insensitive matching
        const words = req.query.location.split(' ').map(word => new RegExp(word, 'i')); // 'i' for case-insensitive search

        const skip = (page - 1) * limit; // Calculate the number of documents to skip
        var items = await CompanyData.find({
            // $or: [
            //     { City: { $regex: regex } },
            //     { Address: { $regex: regex } },
            //     { State: { $regex: regex } },
            // ]
            $or: [
                ...words.map(regex => ({ city: { $regex: regex } })),
                ...words.map(regex => ({ address: { $regex: regex } })),
                ...words.map(regex => ({ state: { $regex: regex } })),
            ],
        }).skip(skip).limit(limit);
        const totalCount = await CompanyData.countDocuments();

        var data = {
            data: items,
            pagination: {
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                totalItems: totalCount
            }
        };
        return responseHandlier.successResponse(true, data, res);

    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
}


exports.SearchData = async (req, res) => {
    try {
        const search = req.query?.search || ''; // Ensure `search` is a string
        const user_id = req.query?.user_id || ''; // Ensure `user_id` is a string
      
        const pagePipeline = [
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
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    connected: user_id ? {
                        $cond: {
                            if: { $in: [mongoose.Types.ObjectId(user_id), "$page_follow_data.user_data.user_id"] },
                            then: 1,
                            else: 0
                        }
                    } : 0 
                }
            },
            {
                $match: {
                    title: { $regex: new RegExp(search, 'i') },
                }
            },
            { $limit: 7},
            {
                $sort: {
                    createdAt: -1
                }
            }
        ];

        const pageDataList = await Page.aggregate(pagePipeline).exec();

        // Prepare search terms for the User query
        const searchTerms = search ? search.split(/\s+/) : [];
        let ExistUser = [];

        if (user_id) {
            const userData = await Chatlist.find({
                $or: [{ sender: mongoose.Types.ObjectId(user_id) }, { receive: mongoose.Types.ObjectId(user_id) }],
                status: 1
            }).exec();
            ExistUser = userData.flatMap(item => [
                item.sender.toString(),
                item.receive.toString()
            ])
        }

        const userQuery = searchTerms.length > 0 ? {
            $or: searchTerms.flatMap(term => [
                { 'first_name': { $regex: new RegExp(term, 'i') } },
                { 'last_name': { $regex: new RegExp(term, 'i') } }
            ]),
            ...(user_id ? { '_id': { $nin: [user_id] } } : {}),
        } : {};
        // user_id
        // const userList = await User.find(userQuery).exec();
        const dataUserList = await User.find(userQuery).exec();
        // Add the `connected` key based on the ExistUser
        const userList = dataUserList.map(user => ({
            ...user.toObject(), // Convert mongoose document to plain object
            connected: ExistUser.includes(user._id.toString()) ? 1 : 0
        }));
   
        
        // Build the query for the Post collection
        const PostQuery = searchTerms.length > 0 ? {
        $or: searchTerms.flatMap(term => [
        { 'users.first_name': { $regex: new RegExp(term, 'i') } },
        { 'users.last_name': { $regex: new RegExp(term, 'i') } },
        { 'description': { $regex: new RegExp(term, 'i') } }
        ])
        } : {};
        console.log(`Post query: ${JSON.stringify(PostQuery)}`);
       
        
        // Aggregation pipeline
        const postList = await Posts.aggregate([
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
                    localField: '_id',
                    foreignField: 'post_id',
                    as: 'reactions'
                }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'post_id',
                    as: 'comments'
                }
            },
            {
                $match: PostQuery
            },
            {
                $sort: { createdAt: -1 }
            }
        ]).exec();

        const dataList = {
            pages: pageDataList,
            users: userList,
            posts: postList
        };
        return responseHandlier.successResponse(true, dataList, res);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        return responseHandlier.errorResponse(false, err.message, res);
    }
};


