const Chatlist = require("../modal/Chatlist");
const Projects = require("../modal/Projects");
const User = require("../modal/User");
const ConnectProject = require("../modal/Connection_Project");
let Validator = require("validatorjs");
const KeyData = require('../Utils/Keyjson')
const responseHandlier = require('../Utils/response/status');
const { Pushnotify } = require("./Firebase")
const { default: mongoose } = require("mongoose");

exports.AddChatlist = async (req, res) => {
    try {
        const { sender, receive } = req.body;
        if(!sender || !receive){
            res.json({ message: 'Send sender and receiver ID', status: true, data: {} });
         return
        }
        if(sender == receive ){
            res.status(400).json({ message: 'User ID Should be different ',status :false,});
            return
        }
        var alreadyExists = await Chatlist.findOne({
            $or: [
                { $and: [{ sender: sender }, { receive: receive }] },
                { $and: [{ sender: receive }, { receive: sender }] }
            ]
        }).exec();
        if (alreadyExists) {
            res.json({ message: 'Chatlist Already stored successfully', status: true, data: alreadyExists });
            return
        }
        var nodeName = KeyData.genrate()
        const newChatlist = new Chatlist({
            sender: req.body.sender,
            receive: req.body.receive,
            nodeId: nodeName
        });
        await newChatlist.save();
        res.json({ message: 'Chatlist stored successfully', status: true, data: newChatlist });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', err });
    }
};
exports.ListChatlist = async (req, res) => {
    try {
        const user = mongoose.Types.ObjectId(req.params.id);
        const pipeline = [
            {
                $match: {
                    $or: [
                        { sender: user },
                        { receive: user }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'sender',
                    foreignField: '_id',
                    as: 'senderDetails'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'receive',
                    foreignField: '_id',
                    as: 'receiverDetails'
                }
            },
            {
                $addFields: {
                    users: {
                        $cond: {
                            if: { $eq: ["$sender", user] },
                            then: { $arrayElemAt: ["$receiverDetails", 0] },
                            else: { $arrayElemAt: ["$senderDetails", 0] }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    sender: 1,
                    receive: 1,
                    nodeId: 1,
                    status: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    last_msg: 1,
                    users: 1 // Explicitly include chatUser
                }
            }
        ];
        const result = await Chatlist.aggregate(pipeline);
        const resultPromises = result.map(async item => {
            let projectDetail = await Projects.findOne({ user_id: item.sender, bp_id: item.receive }).exec();
            if (!projectDetail) {
                const connectProject = await ConnectProject.findOne({
                    user_id: item.sender,
                    bp_id: item.receive,
                }).exec();
                if (connectProject) {
                    projectDetail = await Projects.findById(connectProject.project_id).exec();
                }
            }
            if(item.users?._id){
            return {
                ...item,
                unid: item.users?._id.toString(),
                project_data: projectDetail
            };
        }
        return null
        });
        const resolvedResults = (await Promise.all(resultPromises)).filter(item => item !== null);
        function removeDuplicates(array) {
            const unidSet = new Set();
            return array.filter(obj => {
                if(!unidSet.has(obj.unid)){
                    unidSet.add(obj.unid);
                    return true;
                }
                return false;
            });
        }
        const uniqueArray = removeDuplicates(resolvedResults);
        res.json({ message: 'Chatlist Listed successfully', status: true, data: uniqueArray });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' ,err});
    }
};
exports.DeleteChatlist = async (req, res) => {
    try {
        const item = await Chatlist.findById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'Chatlist not found' });
        }
        await Chatlist.findByIdAndDelete(req.params.itemId);
        res.json({ message: 'Chatlist deleted successfully', status: true });
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};
exports.UpdateChatlist = async (req, res) => {
    try {
        const item = await Chatlist.findById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'Chatlist not found' });
        }
        await Chatlist.findByIdAndUpdate(req.params.itemId, {
            key: req.body.key,
            value: req.body.value
        });
        res.json({ message: 'Chatlist updated successfully', status: true });
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};
exports.DemoFireBase = async (req,res) => {
    try {
        const userData = await User.findById(req.params.id).exec()
        if (!userData.device_token) {
            return res.status(404).json({ message: 'Device Token not found' });
        }
        await Pushnotify(userData, req.body);
        return res.status(200).json({ message: 'Notification sended successfully', status: true });
    } catch (error) {
        console.error('Error sending notification:', error);
        return res.status(500).json({ message: 'Error sending notification:', error });
    }
}
exports.LastMsg = async(req,res) => {
    const {last_msg,nodeId} =req.body;
    try {
        const ClientApp = await Chatlist.findOneAndUpdate(
            { nodeId }, // Filter: find document where nodeId matches
            { last_msg }, // Update: set last_msg to the new value
            { new: true } // Options: return the updated document
          );
          res.json({ data: ClientApp });
        } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}