const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;



const PersonalSkillsSchema = new Schema(
  {
    area_of_interest: {
      type: Array,
      default: null,
    },
    industry_id: {
      type: Array,
      default: null,
    },
    user_id: {
      type: ObjectId,
      ref:"User"
    },
    status:{
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: "created_date", updatedAt: "updated_date" },
  }
);

module.exports = mongoose.model("PersonalSkills", PersonalSkillsSchema);
