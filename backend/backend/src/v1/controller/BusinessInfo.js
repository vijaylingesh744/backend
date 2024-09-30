const BusinessInfo = require("../modal/BusinessInfo");
let Validator = require("validatorjs");
const User = require("../modal/User");
const ObjectId = require('mongoose').Types.ObjectId;
const responseHandlier = require('../Utils/response/status');
const Chatlist = require("../modal/Chatlist");
const PersonalSkills = require('../modal/PersonalSkills')

exports.AddBusinessInfo = async (req, res) => {
    try {
    const newBusinessInfo = new BusinessInfo({
        area_of_interest: req.body.area_of_interest,
        company_name: req.body.company_name,
        website: req.body.website,
        email: req.body.email,
        phone: req.body.phone,
        annual_turnover: req.body.annual_turnover,
        size: req.body.size,
        type: req.body.type,
        country: req.body.country,
        industry_id: req.body.industry_id,
        city: req.body.city,
        user_id: req.body.user_id,
        other_industry: req.body.other_industry,
    });
    await newBusinessInfo.save();
    return res.json({ message: 'reacted successfully', status: true, data: newBusinessInfo });
} catch(err){
    return responseHandlier.errorResponse(false,err.message, res);
}
};

exports.ListBusinessInfo = async (req, res) => {
    try {
    const items = await BusinessInfo.find();
    // res.json(items);
    return res.json({ message: 'Listed successfully', status: true, data: items });
} catch(err){
    return responseHandlier.errorResponse(false,err.message, res);
}
};

exports.DeleteBusinessInfo = async (req, res) => {
    try {
        const item = await BusinessInfo.findById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'BusinessInfo not found', status: false });
        }
        await BusinessInfo.findByIdAndDelete(req.params.itemId);
        res.json({ message: 'BusinessInfo deleted successfully', status: true });
    } catch (err) {
        return responseHandlier.errorResponse(false,err.message, res);
    }
};

exports.UpdateBusinessInfo = async (req, res) => {
    try {
        const item = await BusinessInfo.findById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'BusinessInfo not found' });
        }
        // Add logic to check ownership or permissions
        await BusinessInfo.findByIdAndUpdate(req.params.itemId, {
            area_of_interest: req.body.area_of_interest,
            company_name: req.body.company_name,
            website: req.body.website,
            business_contact: req.body.business_contact,
            address: req.body.address,
            country: req.body.country,
            city: req.body.city,
            user_id: req.body.user_id,
            postal_code: req.body.postal_code,
        });
        res.json({ message: 'BusinessInfo updated successfully', status: true });
    } catch (err) {
        return responseHandlier.errorResponse(false,err.message, res);
    }
};

exports.GetNotification = async (req,res) =>{
    try {
    const UserId = req.params.id;
    const type = req.params.type;
    const clientUserArr = await PersonalSkills.findOne({ user_id:UserId}).exec();
    const mergedArray = clientUserArr.area_of_interest || [];
    const dataArr = JSON.stringify(mergedArray.map(item=>item.title));
    // const promises = GetArrInterestUser(dataArr,type);
    // const data = await Promise.all(promises);
    const data = await GetArrInterestUser(dataArr, type);
    var uniqueDataMap = new Map();
    for (const obj of data) {
      if (obj.user_id && !uniqueDataMap.has(obj.user_id.toString())) {
        var alreadyExists = await Chatlist.findOne({
          $or: [
            { $and: [{ sender: obj.user_id }, { receive: UserId }] },
            { $and: [{ sender: UserId }, { receive: obj.user_id }] }
          ]
        }).exec();
        if (!alreadyExists) {
          uniqueDataMap.set(obj.user_id.toString(), obj);
        }
      }
    }
    
    var uniqueDataArray = Array.from(uniqueDataMap.values());
    return responseHandlier.successResponse(true,uniqueDataArray?.slice(0, 10), res);
} catch (err) {
    return responseHandlier.errorResponse(false,err.message, res);
}
}

exports.GetClient = async (req,res) =>{
        try {
        const UserId = req.params.id;
        const clientUserArr = await BusinessInfo.findOne({ user_id:UserId}).exec();
        const mergedArray = clientUserArr.area_of_interest || [];
        const promises =  mergedArray.map(item=>GetCurrentInterestUser(item.title,3))
        const data = await Promise.all(promises);
        var concatenatedData = [].concat(...data);
        var uniqueDataMap = new Map();
        concatenatedData.forEach(obj => {
          if (obj.user_id && !uniqueDataMap.has(obj.user_id.toString())) {
            uniqueDataMap.set(obj.user_id.toString(), obj);
          }
        });
        var uniqueDataArray = Array.from(uniqueDataMap.values());
        return responseHandlier.successResponse(true,uniqueDataArray?.slice(0, 10), res);
    } catch (err) {
        return responseHandlier.errorResponse(false,err.message, res);
    }
}

async function GetCurrentInterestUser(title,type) {
    var bpUsers = await User.find({ user_type: type }).exec();
    if (type == 3) {
      bpUsers = await User.find({ user_type: { $in: [0,1,2] } }).exec();
    } else {
      bpUsers = await User.find({ user_type: type }).exec();
    }    
    const bpUserIds = bpUsers.map(user => user._id);    
    const pipeline = [
      {
        $match: {
          user_id: { $in: bpUserIds }
        }
      },
      {
        $lookup: {
          from: "users", // Assuming the collection name is users
          localField: "user_id",
          foreignField: "_id",
          as: "userdata"
        }
      },
      {
        $unwind: "$userdata"
      }
    ];
    
    const bpUserArr = await BusinessInfo.aggregate(pipeline).exec();
    const titleSet = new Set(JSON.parse(title));
    const userdata = [];
    let iterate = 0;
    
    for (const item of bpUserArr) {
      const interestSet = new Set(item.area_of_interest.map(interest => interest.title));
      const similarity = jaccardSimilarity(titleSet, interestSet);
    
      if (similarity >= 0.20) {
        userdata.push({
          user_id: item.user_id,
          industry: item.area_of_interest,
          userdata: item.userdata,
          similarity: similarity
        });
    
        iterate += 1;
    
        // Break if we have collected 10 results
        if (iterate >= 10) {
          break;
        }
      }
    }
    
    // Sort the results by similarity in descending order
    userdata.sort((a, b) => b.similarity - a.similarity);
    
    return userdata;
}

const jaccardSimilarity = (setA, setB) => {
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return intersection.size / union.size;
};

  
async function GetArrInterestUser(title, type) {
    var bpUsers ;
    if(type == 3){
      bpUsers = await User.find({ user_type: { $in: [0,2]}}).limit(65).exec();
    }else{
      bpUsers = await User.find({ user_type: type }).exec();
    }
    const bpUserIds = bpUsers.map(user => user._id);
    // const pipeline = [
    //   {
    //     $match: {
    //       user_id: { $in: bpUserIds }
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "users", // Assuming the collection name is users
    //       localField: "user_id",
    //       foreignField: "_id",
    //       as: "userdata"
    //     }
    //   },
    //   {
    //     $unwind: "$userdata"
    //   },
    //   {
    //     $lookup: {
    //       from: "chatlists",
    //       localField: "sender",
    //       foreignField: "$userdata._id",
    //       as: "senderDetails"
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "receive",
    //       foreignField: "$userdata._id",
    //       as: "receiveDetails"
    //     }
    //   },
    //   {
    //     $addFields: {
    //         matchedField: {
    //             $cond: {
    //                 if: { $eq: ["$sender", user_id] },
    //                 then: "senderData",
    //                 else: "receiverData"
    //             }
    //         }
    //     }
    //  },
    //   {
    //     $unwind: {
    //     path: "$senderDetails",
    //     preserveNullAndEmptyArrays: true  
    //     }   
    //   },
    //   {
    //     $unwind: {
    //       path: "$receiveDetails",
    //       preserveNullAndEmptyArrays: true  
    //       }  
    //   },
    // ];
    const pipeline = [
      // Stage 1: Match users
      {
        $match: {
          user_id: { $in: bpUserIds }
        }
      },
      // Stage 2: Lookup user details
      {
        $lookup: {
          from: "users", // The collection name for user details
          localField: "user_id",
          foreignField: "_id",
          as: "userdata"
        }
      },
      // Stage 3: Unwind userdata to flatten the array
      {
        $unwind: "$userdata"
      },
      // Stage 4: Lookup sender details from chatlists
      {
        $lookup: {
          from: "chatlists",
          localField: "user_id", // Assuming user_id is linked to chatlists' sender
          foreignField: "sender",
          as: "senderDetails"
        }
      },
      {
        $lookup: {
          from: "chatlists", // Collection name for receiver details
          localField: "user_id", // Assuming user_id is linked to chatlists' receiver
          foreignField: "_id",
          as: "receiveDetails"
        }
      },
      {
        $addFields: {
          senderDetailsCount: { $size: "$senderDetails" },
          receiveDetailsCount: { $size: "$receiveDetails"}
        }
      },
    ];
    const bpUserArr = await PersonalSkills.aggregate(pipeline).exec();
    var userdata = [];
    const titleSet = new Set(JSON.parse(title));
    var iterate = 0

    for (let i = 0; i < bpUserArr.length; i++) {
      const item = bpUserArr[i];
      const interestSet = new Set(item.area_of_interest.map(interest => interest.title));
      const similarity = jaccardSimilarity(titleSet, interestSet);
      if (similarity >= 0.20) { 
        item.userdata.totalconnection = item.senderDetailsCount+item.receiveDetailsCount;
        userdata.push({
          user_id: item.user_id,
          industry: item.area_of_interest,
          userdata: item.userdata,
          similarity: similarity 
        });
        iterate+=1;
      }
      if (iterate >= 10) {
          break;
      }
  }
    userdata.sort((a, b) => b.similarity - a.similarity);
    return userdata;
}