const ConnectProject = require("../modal/Connection_Project");
const Chatlist = require("../modal/Chatlist");
const ObjectId = require('mongoose').Types.ObjectId;
const KeyData = require('../Utils/Keyjson')

exports.AddConnectProject = async (req, res) => {
    var data = await ConnectProject.findOne({
        project_id: req.body.project_id,
        user_id: req.body.user_id,
        bp_id: req.body.bp_id,
    }).exec();

    if (data) {
        return res.json({
            status: false,
            message: "Connection already exists"
        });
    } else {
        const newConnectProject = new ConnectProject({
            project_id: req.body.project_id,
            user_id: req.body.user_id,
            bp_id: req.body.bp_id,
            user_type: req.body.user_type,
            status: 0,
        });
        await newConnectProject.save();
        return res.status(200).send({
            status: true,
            message: "connection created successfully",
            data: newConnectProject,
        });
    }
};

exports.ListConnectProject = async (req, res) => {
    try {

        // Example pagination parameters
const page = parseInt(req.query.page, 10) || 1; // Current page number (default: 1)
const limit = parseInt(req.query.limit, 10) || 10; // Number of items per page (default: 10)

const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const paramsId = ObjectId(req.params.id);
        const items = await ConnectProject.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "bp_id",
                    foreignField: "_id",
                    as: "userdata"
                }
            },
            {
                $unwind: "$userdata"
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "project_id",
                    foreignField: "_id",
                    as: "projectdata"
                }
            },
            {
                $unwind: "$projectdata"
            },
            {
                $match: {
                    "user_id": paramsId
                }
            },
            { $skip: skip },  // Skip the documents for the current page
            { $limit: limit } // Limit the number of documents returned
        ]).exec();

        return res.status(200).send({
            status: true,
            message: "Connection Listed successfully",
            data: items,
        });
    } catch (err) {
        return res.status(400).send({
            status: false,
            message: "Some thing went Wrong",
            data: err,
        });
    }

};

exports.ListProject = async (req, res) => {
    const paramsId = ObjectId.isValid(req.params.id) ? new ObjectId(req.params.id) : null;
    try {
        const items = await Chatlist.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "sender",
                    foreignField: "_id",
                    as: "userdata"
                }
            },
            {
                $unwind: "$userdata"
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "project_id",
                    foreignField: "_id",
                    as: "projectdata"
                }
            },
            {
                $unwind: "$projectdata"
            },
            {
                $match: {
                    "project_id": paramsId
                }
            }
        ]).exec();

        return res.status(200).send({
            status: true,
            message: "Project Listed successfully",
            data: items,
        });
    } catch (err) {

        return res.status(400).send({
            status: false,
            message: "Something went Wrong",
            data: err,
        });
    }
};

exports.DeleteConnectProject = async (req, res) => {
    try {
        const item = await ConnectProject.findById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'ConnectProject not found' });
        }
        // Add logic to check ownership or permissions
        await ConnectProject.findByIdAndDelete(req.params.itemId);
        res.json({ message: 'ConnectProject deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.UpdateConnectProject = async (req, res) => {
    try {
        const {bp_id,project_id,user_id} = req.body;
        const ConnectList = await ConnectProject.findOneAndUpdate({ user_id: user_id, bp_id: bp_id,project_id:project_id}, { status: req.params.status });
        const Check = await Chatlist.findOne(
            { sender: user_id, receive: bp_id},
        );
        var ChatUpdate ;
        if(Check){
             ChatUpdate = await Chatlist.findOneAndUpdate(
                {sender: user_id, receive: bp_id},
                { $set: { status: req.params.status }},
                { returnOriginal: false }
            );
        }else{
            ChatUpdate = await new Chatlist({ sender: user_id, receive: bp_id,nodeId: await KeyData.genrate(), status: req.params.status}).save();
        }
    
        return res.status(200).send({
            status: true,
            message: 'Connect Project updated successfully',
            data: ConnectList,
            chats:ChatUpdate
        });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};