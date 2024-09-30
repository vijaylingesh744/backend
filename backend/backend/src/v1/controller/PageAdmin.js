const PageAdmin = require("../modal/PageAdmin");
const { default: mongoose } = require("mongoose");

exports.CreatePageAdmin = async (req, res) => {
  try {
    const { page_id, users } = req.body;
    const existdata = await PageAdmin.findOne({ page_id }).exec();
    let updateData;
    if (!existdata) {
      updateData = await PageAdmin.findOneAndUpdate(
        { page_id },
        { $set: { users } },
        { new: true, upsert: true }
      );
    } else {
      const addUserPromises = users.map(item => {
        return PageAdmin.findOneAndUpdate(
          { page_id },
          { $addToSet: { users: { user: item.user, role: item.role } } },
          { new: true }
        );
      });
  
      updateData = await Promise.all(addUserPromises);
    }
  
    return res.json({
      status: true,
      message: "Updated successfully",
      data: updateData
    });
  } catch (err) {
    return res.json({
      status: false,
      message: err.message || "An error occurred"
    });
  }
}

exports.AdminPagelist = async(req,res)=>{
 try{
  const result = await PageAdmin.aggregate([
    {
      $match: {
        "users.user": mongoose.Types.ObjectId(req.params.id) // Match the adminPage where the user is in the 'users' array
      }
    },
    {
      $lookup: {
        from: 'pages', // The collection to join with
        localField: 'page_id', // Field from the adminPage collection
        foreignField: '_id', // Field from the pages collection
        as: 'page' // The name of the new field to add to the adminPage documents
      }
    },
    {
      $unwind: {
        path: '$page', // Unwind the page array to convert it to a single object
        preserveNullAndEmptyArrays: true // Keep the document even if there is no match
      }
    }
  ]);
   
  res.json({data:result});
}catch(err){
    res.json({err})
  }
}

exports.ExistsAdmin = async(req,res)=>{
  try {
    const Listdata = await PageAdmin.aggregate([
      { $match: { page_id: mongoose.Types.ObjectId(req.params.id) } },
      { $unwind: "$users" },
      {
        $lookup: {
          from: "users", // The name of the User collection
          localField: "users.user",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" },
      {
        $group: {
          _id: "$_id",
          page_id: { $first: "$page_id" },
          users: {
            $push: {
              user: "$users.user",
              role: "$users.role",
              userDetails: "$userDetails"
            }
          },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          status: { $first: "$status" }
        }
      }
    ]);
    return res.json({
      status: true,
      message: "Listed successfully",
      data: Listdata
    });
  } catch (err) {
    return res.json({
      status: false,
      message: err
    });
  }
}

exports.RemoveUserFromPageAdmin = async (req, res) => {
  try {
    const { page_id, userId } = req.params; // Assuming userId is the identifier for the user
    const updateData = await PageAdmin.findOneAndUpdate(
      { page_id },
      { $pull: { users: { user: userId } } }, // This removes the user with the specified userId
      { new: true }
    );

    if (!updateData) {
      return res.json({
        status: false,
        message: "Page not found or user not found in the page."
      });
    }

    return res.json({
      status: true,
      message: "User removed successfully",
      data: updateData
    });
  } catch (err) {
    return res.json({
      status: false,
      message: err.message || "An error occurred"
    });
  }
}