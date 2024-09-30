const BpClient = require("../modal/BpClients");
let Validator = require("validatorjs");
const ObjectId = require('mongoose').Types.ObjectId;

exports.AddBpClient = async (req, res) => {
    const {
        user_id,
        bp_id,
        user_type,
        req_date_time
    } = req.body;

    try {
        let alreadyExists = await BpClient.findOne({ user_id:user_id,bp_id :bp_id}).exec();
        if (alreadyExists) {
            res.json({
                status: true,
                data: alreadyExists,
                message: 'Bp Client  Successfully'
            });
        } else {
            const newBpClient = new BpClient({
                user_id,
                bp_id,
                user_type,
                req_date_time
            });
            await newBpClient.save();
            res.json({
                status: true,
                data: newBpClient,
                message: 'BpClient Added Successfully'
            });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Internal server error', error });
    }
};

exports.ListBpClient = async (req,res)=>{
    const user_id = req.params.id;

    const pipeline = [
        {
            $match: {
                "bp_id": ObjectId(user_id) // Assuming user_id is the field you want to match against
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "userdata"
            }
        },
        {
            $unwind: "$userdata"
        }
    ];
    
    const data = await BpClient.aggregate(pipeline).exec();
    // const newPostReaction = await BpClient.find({bp_id:user_id}).exec();


   return res.json({message: 'listed successfully', success:true,data:data });
}
