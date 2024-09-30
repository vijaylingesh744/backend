const Review = require("../modal/Review");
let Validator = require("validatorjs");
const responseHandlier = require('../Utils/response/status');

exports.AddReview = async (req, res) => {
  var Filter = {
    bp_id:req.body.bp_id,
    user_id:req.body.user_id
  }

    const options = {
        new: true, // Return the updated document
        upsert: true, // Create a new document if no match is found
        setDefaultsOnInsert: true, 
      };
      
      const review = await Review.findOneAndUpdate(Filter, req.body, options);
      
    return responseHandlier.successResponse(true,review, res);
};

exports.ListReview = async(req,res)=>{
   const id = req.params.id;
   const reviewData = await Review.find({bp_id:id}).exec();
   return responseHandlier.successResponse(true,reviewData, res);
}