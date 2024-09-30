const KeyData = require('../Utils/Keyjson')
const responseHandlier = require('../Utils/response/status');
const OtherNotify = require("../modal/OtherNotification")
const { default: mongoose } = require("mongoose");
const ChatList = require('../modal/Chatlist');
const User = require('../modal/User');

exports.AddUserConnect = async (req, res) => {
    try {
        const { sender, receive } = req.body
        if (!sender || !receive) {
            res.status(400).json({ message: 'Send sender and receiver ID', status: true, data: {} });
            return
        }
        if (sender == receive) {
            res.status(400).json({ message: 'User ID Should be different ', status: false, });
            return
        }
        var alreadyExists = await ChatList.findOne({
            $or: [
                { $and: [{ sender: sender }, { receive: receive }] },
                { $and: [{ sender: receive }, { receive: sender }] }
            ]
        }).exec();

        if (alreadyExists) {
            res.json({ message: 'UserConnect Already stored successfully', status: true, data: alreadyExists });
            return
        }
        var nodeName = KeyData.genrate()
        const newUserConnect = new ChatList({
            sender: req.body.sender,
            receive: req.body.receive,
            nodeId: nodeName
        });
        await Notification({
            sender: req.body.sender,
            receive: req.body.receive
        })
        await newUserConnect.save();
        res.json({ message: 'UserConnect stored successfully', status: true, data: newUserConnect });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', err });
    }
};

const Notification = async (data) => {
    const {
        sender,
        receive
    } = data
    const senderdata = await User.findById(sender).exec()
    const clientdata = await User.findById(receive).exec()
    const Added = new OtherNotify({
        client_id: receive,
        user_id: sender,
        description: `Hi ${clientdata?.first_name}, you have received a new request from ${senderdata?.first_name}. Please review it at your earliest convenience`
    })
    const saveData = await Added.save();
    return saveData
}


exports.ListUserConnect = async (req, res) => {
    const sender = req.params.sender;
    const receiver = req.params.receiver;

    try {
        const items = await ChatList.findOne({
            $or: [
                { $and: [{ sender: sender }, { receive: receiver }] },
                { $and: [{ sender: receiver }, { receive: sender }] }
            ]
        }).exec();
        res.json({ message: 'UserConnect Listed successfully', status: items ? true : false, data: items });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving UserConnect', status: false, error: error.message });
    }
};
exports.DeleteUserConnect = async (req, res) => {
    try {
        const item = await ChatList.findById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'UserConnect not found' });
        }
        await ChatList.findByIdAndDelete(req.params.itemId);
        await ChatList.findOneAndDelete({
            $or: [
                { $and: [{ sender: item.sender }, { receive: item.receive }] },
                { $and: [{ sender: item.receive }, { receive: item.sender }] }
            ]
        });
        res.json({ message: 'UserConnect deleted successfully', status: true });
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};
exports.UpdateUserConnect = async (req, res) => {
    try {
        const updateconnect = await ChatList.findOneAndUpdate({
            $or: [
                { $and: [{ sender: ChatUpdate.user_id }, { receive: ChatUpdate.client_id }] },
                { $and: [{ sender: ChatUpdate.client_id }, { receive: ChatUpdate.user_id }] }
            ]
        }, { status: 1 });

        return res.status(200).send({
            status: true,
            message: 'Connect Project updated successfully',
            data: ChatUpdate,
        });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', err });
    }
};
exports.CloneUpdateUserConnect = async (req, res) => {
    try {
        if (req.params.status == "2") {
            var ChatUpdate = await ChatList.findOneAndDelete({ nodeId: req.params.id }, { returnOriginal: true });
        } else {
            var ChatUpdate = await ChatList.findOneAndUpdate({ nodeId: req.params.id }, { status: req.params.status });
        }
        return res.status(200).send({
            status: true,
            message: 'Connect Project updated successfully',
            data: ChatUpdate,
        });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', err });
    }
};
exports.clientList = async (req, res) => {
    try {
        const userId = req.params.itemId;
        const pipeline = [
            {
                $match: { $or: [{ sender: mongoose.Types.ObjectId(userId) }, { receive: mongoose.Types.ObjectId(userId) }] }
            },
            {
                $addFields: {
                    matchedField: {
                        $cond: {
                            if: { $eq: ["$sender", mongoose.Types.ObjectId(userId)] },
                            then: "senderData",
                            else: "receiverData"
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'receive',
                    foreignField: '_id',
                    as: 'receiverData'
                }
            },
            {
                $unwind: "$receiverData"
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'sender',
                    foreignField: '_id',
                    as: 'senderData'
                }
            },
            {
                $unwind: "$senderData"
            },
        ];
        const result = await ChatList.aggregate(pipeline);
        return res.status(200).send({
            status: true,
            message: 'Connect fetch successfully',
            data: result,
        });
    } catch (error) {
        return responseHandlier.errorResponse(false, error.message, res);
    }
};

exports.UserList = async (req, res) => {
    var user_id = mongoose.Types.ObjectId(req.params.id);
    const chatlistPipeline = [
        {
            $lookup: {
                from: "users",
                localField: "sender",
                foreignField: "_id",
                as: "senderDetails"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "receive",
                foreignField: "_id",
                as: "receiveDetails"
            }
        },
        {
            $addFields: {
                matchedField: {
                    $cond: {
                        if: { $eq: ["$sender", user_id] },
                        then: "senderData",
                        else: "receiverData"
                    }
                }
            }
        },
        {
            $unwind: "$senderDetails"
        },
        {
            $unwind: "$receiveDetails"
        },
        {
            $match: {
                $or: [
                    { sender: user_id },
                    { receive: user_id }
                ]
            }
        },
        {
            $project: {
                _id: 1,
                sender: 1,
                receive: 1,
                nodeId: 1,
                status: 1,
                senderDetails: 1,
                matchedField: 1,
                receiveDetails: 1,
            }
        }
    ];

    try {
        res.json({ data: await ChatList.aggregate(chatlistPipeline).exec() });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};