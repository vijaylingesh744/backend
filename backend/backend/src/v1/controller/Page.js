const Page = require("../modal/Page")
const responseHandlier = require('../Utils/response/status');
const PageAdmin = require("../modal/PageAdmin");
const imageUpload = require('../Utils/ImageUpload');
var formidable = require("formidable");
const { default: mongoose } = require("mongoose");
exports.AddPage = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
        return responseHandlier.errorResponse(false, "Request must be a multipart form data", res);
    }
    form.parse(req, async (err, fields, files) => {
        try {
            if (err) {
                return responseHandlier.errorResponse(false, err.message, res);
            }
            const reqdata = JSON.parse(fields.data);
            var Image = ""
            var Profile_icon = ""
            if (files.image) {
                Image = await imageUpload(files.image);
            }
            if (files.profile_icon) {
                Profile_icon = await imageUpload(files.profile_icon)
            }
            const newPage = new Page({ ...reqdata, image: Image, profile_icon: Profile_icon });
            await newPage.save();
            return responseHandlier.successResponse(true, newPage, res);
        } catch (err) {
            return responseHandlier.errorResponse(false, err.message, res);
        }
    })
}
exports.updatepage = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
        return responseHandlier.errorResponse(false, "Request must be a multipart form data", res);
    }
    form.parse(req, async (err, fields, files) => {
        try {
            if (err) {
                return responseHandlier.errorResponse(false, err.message, res);
            }
            const reqdata = JSON.parse(fields.data);
            var Image = ""
            var Profile_icon = ""
            let updateData = { ...reqdata };
            if (files.image) {
                const Image = await imageUpload(files.image);
                updateData.image = Image;
            }
            if (files.profile_icon) {
                const Profile_icon = await imageUpload(files.profile_icon);
                updateData.profile_icon = Profile_icon;
            }
            const newPage = await Page.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }  // Option to return the updated document
            );
            // if (files.image) {
            //     Image = await imageUpload(files.image);
            //     const newPage = await Page.findByIdAndUpdate(
            //         req.params.id,
            //         { ...reqdata, image: Image},
            //         { new: true }  // Option to return the updated document
            //     );
            // }
            // if (files.profile_icon) {
            //     Profile_icon = await imageUpload(files.profile_icon)
            //     const newPage = await Page.findByIdAndUpdate(
            //         req.params.id,
            //         { ...reqdata,profile_icon: Profile_icon },
            //         { new: true }  // Option to return the updated document
            //     );
            // }
            // const newPage = await Page.findByIdAndUpdate(
            //     req.params.id,
            //     { ...reqdata},
            //     { new: true }  // Option to return the updated document
            // );
            return responseHandlier.successResponse(true, newPage, res);
        } catch (err) {
            return responseHandlier.errorResponse(false, err.message, res);
        }
    })
}
exports.ListPage = async (req, res) => {
    try {
        var id = req.query?.id
        var user_id = req.query?.user_id
        let list = [];
        const page = parseInt(req.query.page) || 1; // Get the current page from the query parameters (default to 1)
        const limit = parseInt(req.query.limit) || 10; // Get the limit from the query parameters (default to 10)
        const skip = (page - 1) * limit; // Calculate the number of documents to skip
        if (id == 1) {
            list = await Page.aggregate([
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
                    $match: {
                        title: { $regex: /GICTC/, $options: 'i' }
                    }
                },
            ]).exec();
        } else if (user_id) {
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
                    $match: {
                        'page_follow_data.user_data.user_id': { $ne: mongoose.Types.ObjectId(user_id) },
                        'title': { $not: /GICTC/i },
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
            ];
            list = await Page.aggregate(pipeline).exec();
        } else {
            list = await Page.aggregate([
                {
                    $lookup: {
                        from: 'pagefollowers',
                        localField: '_id',
                        foreignField: 'page_id',
                        as: 'page_follow_data'
                    },
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
                    $skip: skip // Skip documents for pagination
                },
                {
                    $limit: limit // Limit the number of documents returned
                }
            ]).exec();
        }
        return responseHandlier.successResponse(true, list, res)
    } catch (err) {
        console.error(err)
        return responseHandlier.errorResponse(false, err.message, res);
    }
}
exports.ListIdPage = async (req, res) => {
    const page_id = req.params.id
    try {
        const IDlist = await Page.findById(page_id)
        if (!IDlist) {
            return responseHandlier.errorResponse(false, "Page not found", res);
        }
        return responseHandlier.successResponse(true, IDlist, res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
}

exports.ListDataPage = async (req, res) => {
    try {
        const spaceRemovedtitle = req.params.id.replace(/@/g, '').toLowerCase();

        var checkData = await Page.aggregate([
            {
                $lookup: {
                    from: 'pagefollowers',
                    localField: '_id',
                    foreignField: 'page_id',
                    as: 'page_follow_data'
                }
            },
            {
                $match: {
                    $expr: {
                        $eq: [
                            { $replaceAll: { input: { $toLower: "$title" }, find: " ", replacement: "" } }, 
                            spaceRemovedtitle
                        ]
                    }
                }
            }
        ]).exec(); 

        var list = await Page.aggregate([
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
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user_page_data'
                }
            },
            {
                $unwind: {
                    path: "$user_page_data",
                    preserveNullAndEmptyArrays: true
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
                $project: {
                    title: 1,
                    _id: 1,
                    industry_data: 1,
                    description: 1,
                    profile_icon: 1,
                    user_page_data: 1,
                    image: 1,
                    status: 1,
                    website: 1,
                    phone: 1,
                    overview: 1,
                    industry: 1,
                    company_size: 1,
                    location: 1,
                    City: 1,
                    user_id: 1,
                    area_of_interest: 1,
                    city: 1,
                    page_follow_data: {
                        $filter: {
                            input: "$page_follow_data",
                            as: "follower",
                            cond: { $eq: ["$$follower.status", 1] } // Filter followers by status
                        }
                    }
                }
            },
            {
                $match: {
                    $expr: {
                        $eq: [
                            { $replaceAll: { input: { $toLower: "$title" }, find: " ", replacement: "" } }, 
                            spaceRemovedtitle
                        ]
                    }
                }
            }
        ]).exec();    
        
        return res.json({
            success: true,
            data: list,
            dataList:checkData
        })
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
}
exports.CheckPageTitleExists = async (req, res) => {
    const newtitle = req.query.title.replace(/^ +| +$/g, '').toLowerCase()
    try {
        // const page = await Page.findOne({title:newtitle})
        const page = await Page.findOne({ $expr: { $eq: [{ $toLower: "$title" }, newtitle] } })
        if (page) {
            return responseHandlier.successResponse(false, "Page title already exists", res);
        }
        return responseHandlier.successResponse(true, "New Title", res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
}

exports.getUserpage = async (req, res) => {
    try {
        const userId = req.params.id;
        const pageList = await Page.find({ user_id: mongoose.Types.ObjectId(userId) }).exec()
        return responseHandlier.successResponse(true, pageList, res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
}

exports.listpostPage = async (req, res) => {
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
                    $or: [
                        { 'page_follow_data.user_data.user_id': mongoose.Types.ObjectId(user_id) },
                        { 'user_id': mongoose.Types.ObjectId(user_id) }
                    ]
                }
            }
        ]).exec();
        res.json({ message: 'Users being followed by you', status: true, data: GetData });
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};




const GetPageData = async () => {
    try {
        const getPage = await Page.find({
            $or: [
                { title: { $regex: /CS/, $options: '' } },  // Added 'i' for case-insensitive search
                { title: { $regex: /GICTC/, $options: '' } }
            ]
        }).select("_id").exec();
        const pageIds = getPage.map(item => item._id);
        for (const pageId of pageIds) {
            const updateData = await PageAdmin.updateOne(
            { page_id: pageId },
            { $set: {
            users: {
            user: mongoose.Types.ObjectId("6694fb38de0955f4a77a350a"),
            role: 1
            }
            }},
            { upsert: true } // Create a new document if no document matches the query
            );
            console.log(updateData);
            }
    } catch (error) {
        console.error("Error fetching page data:", error);
    }
};
// GetPageData()