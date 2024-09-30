
let Validator = require("validatorjs");
const ObjectId = require('mongoose').Types.ObjectId;
const Businesscommunity =require("../modal/Bussinesscommunity");

exports.AddBusinesscommunity = async (req, res) => {

    try {
        const { bussiness_id, connecting_list, title } = req.body;
        var updatedBusinessInfo = {}
        if (req.query?.update) {
            updatedBusinessInfo = await Businesscommunity.findOneAndUpdate(
                { bussiness_id, title },
                {
                    $addToSet: { connecting_list: { $each: connecting_list }, bussiness_id, title },
                    $setOnInsert: { status: 1 },
                },
                { new: true, upsert: true, rawResult: true }
            );
        } else {
            updatedBusinessInfo = new Businesscommunity(req.body).save()
        }

        const message = 'Updated successfully';
        return res.json({ message, status: true, data: updatedBusinessInfo.value });
    } catch (err) {
        return res.status(500).json({ message: err.message, status: false });
    }
};

exports.ListBusinessCommunity = async (req, res) => {

    try {
        const UserId = req.params.id;
        const businessCommunity = await Businesscommunity.find({ bussiness_id: UserId});
        return res.json({ message: 'List of business community', status: true, data: businessCommunity})
    }catch(error){
        return res.status(500).json({ message: error.message, status: false });
    }

};





