const Agreement = require("../modal/Agreement");
let Validator = require("validatorjs");
var formidable = require("formidable");
const imageUpload = require('../Utils/ImageUpload');
const responseHandlier = require('../Utils/response/status');
const Projects = require("../modal/Projects");
const Chatlist = require("../modal/Chatlist");
const ConnectProject = require("../modal/Connection_Project");
const ObjectId = require('mongoose').Types.ObjectId;
const Transaction = require("../modal/Transaction");
const KeyData = require('../Utils/Keyjson')

exports.AddAgreement = async (req, res) => {
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
            var user_signature = ""
            if (files.user_signature) {
                user_signature = await imageUpload(files.user_signature);
            }
            const ProjectAdded = new Projects({
                user_id: reqdata.user_id,
                bp_id: reqdata.bp_id,
                user_type: reqdata.buyer_seller,
                title: reqdata.title,
                desc: reqdata.desc,
                designation: reqdata.sector,
                commission_type: reqdata.commision,
                commission_value: reqdata.Buying_price,
            });
            await ProjectAdded.save();
            var dataobject = { ...reqdata, project_id: ProjectAdded._id }
            const newAgreement = new Agreement({ ...dataobject, user_signature: user_signature });
            await newAgreement.save();
            // const newConnectProject = new ConnectProject({
            //     project_id: ProjectAdded._id,
            //     user_id: reqdata.user_id,
            //     bp_id: reqdata.bp_id,
            //     user_type: reqdata.buyer_seller,
            //     status: 0,
            // });
            // await newConnectProject.save();
            var alreadyExists = await Chatlist.findOne({ $and: [{ sender: reqdata.user_id }, { receive: reqdata.bp_id }] }).exec();
            if (alreadyExists) {
                res.json({ message: 'Chatlist Already stored successfully', status: true, data: alreadyExists });
                return
            }
            var nodeName = KeyData.genrate()
            const newChatlist = new Chatlist({
                sender: reqdata.user_id,
                receive: reqdata.bp_id,
                nodeId: nodeName,
                project_id: ProjectAdded._id,
                request_type: 1,
                status: 0
            });
            var update = await newChatlist.save()
            console.log(update)
            return responseHandlier.successResponse(true, newAgreement, res);
        } catch (err) {
            return responseHandlier.errorResponse(false, err.message, res);
        }
    })
};

exports.ListAgreement = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default page 1
        const limit = parseInt(req.query.limit) || 10; // Default limit 10
        const skip = (page - 1) * limit; // Calculate the number of documents to skip
        const totalCount = await Agreement.countDocuments();
        const pipeline = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $unwind: "$users"
            },
            { $skip: skip },
            { $limit: limit },
        ];
        const items = await Agreement.aggregate(pipeline);
        var successData = {
            data: items,
            pagination: {
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                totalItems: totalCount
            }
        };
        return responseHandlier.successResponse(true, successData, res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};

exports.DeleteAgreement = async (req, res) => {
    try {
        const item = await Agreement.findById(req.params.itemId);
        if (!item) {
            return responseHandlier.errorResponse(false, 'Agreement not found', res);
        }
        await Agreement.findByIdAndDelete(req.params.itemId);
        return responseHandlier.successResponse(true, 'Agreement deleted successfully', res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};

exports.UpdateAgreement = async (req, res) => {
    try {
        const item = await Agreement.findById(req.params.itemId);

        if (!item) {
            return responseHandlier.errorResponse(false, 'Agreement not found', res);
        }

        await Agreement.findByIdAndUpdate(req.params.itemId, {
            buyer_seller: req.body.buyer_seller,
            sector: req.body.sector,
            date_time: req.body.date_time,
            commision: req.body.commision,
            valid_to: req.body.valid_to,
            valid_from: req.body.valid_from,
            signature_buyer: req.body.signature_buyer,
            signature_seller: req.body.signature_seller
        });

        return responseHandlier.successResponse(true, 'Agreement updated successfully', res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};

exports.ListBpNotification = async (req, res) => {
    try {
        const userIdObjectId = ObjectId.isValid(req.params.id) ? new ObjectId(req.params.id) : null;
        const AggrementList = await Agreement.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'bp_id',
                    foreignField: '_id',
                    as: 'bp'
                },
            },
            {
                $lookup: {
                    from: 'transactions',
                    localField: 'projectId',
                    foreignField: 'project_id',
                    as: 'Invoice'
                },
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'project_id',
                    foreignField: '_id',
                    as: 'project'
                },
            },
            {
                $lookup: {
                    from: 'chatlists',
                    localField: 'project_id',
                    foreignField: 'project_id',
                    as: 'connect_project'
                },
            },
            {
                $unwind: "$user"
            },
            {
                $unwind: "$project"
            },
            {
                $unwind: "$bp"
            },
            {
                $match: {
                    bp_id: userIdObjectId
                }
            },
            {
                $sort: {
                    updatedAt: -1
                }
            }
        ]).exec();
        return responseHandlier.successResponse(true, AggrementList, res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};

exports.UpdateBpNotification = async (req, res) => {
    try {
        const { user_id, bp_id, status } = req.body
        const ChatUpdate = await Chatlist.findOneAndUpdate(
            { sender: user_id, receive: bp_id },
            { $set: { status: status } },
            { returnOriginal: false }
        );
        const AggrementList = await Agreement.findOneAndUpdate(
            { bp_id: bp_id, user_id: user_id },
            { $set: { status: status } }
        );
        const ProjectsList = await Projects.findOneAndUpdate(
            { bp_id: bp_id, user_id: user_id },
            { $set: { status: status } }
        );
        // const filter = {
        //     project_id: ProjectsList._id,
        //     user_id: user_id,
        //     bp_id: bp_id,
        //   };

        // const update = {
        //     project_id: ProjectsList._id,
        //     user_id: user_id,
        //     bp_id: bp_id,
        //     user_type: "1",
        //     status: status,
        // };

        // const result = await ConnectProject.updateOne(filter, update, { upsert: true });
        return responseHandlier.successResponse(true, ProjectsList, res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};