const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    first_name:{
        type: String,
        // required: true,
    },
    last_name:{
        type: String,
    },
    gmail:{
        type:String,
        default: null,
    },
    gender:{
        type:String,
        default: null,
    },
    profile:{
        type:String,
        default:null,
    },
    randomprofile:{
        type:Number,
        default: function() {
            return Math.floor(Math.random() * 5); // Generate a random number between 0 and 4
        },
    },
    phone:{
        type:String,
        default: null,
    },
    date_of_birth:{
        type:String,
        default: null,
    },
    designation:{
        type:String,
        default: null,
    },
    city:{
        type:String,
        default: null,
    },
    country:{
        type:String,
        default: null,
    },
    state:{
        type:String,
        default: null,
    },
    google_id:{
        type: String,
        default: null,
    },
    user_type:{
        type: String,
        default: "0",
    },
    login_type:{
        type: String,
        default: null,
    },
    otp:{
        type: String,
        default: null,
    },
    device_token:{
        type: String,
        default: null,
    },
    device_type:{
        type: String,
        default: null,
    },
    company:{
        type: String,
        default: null,
    },
    about:{
        type: String,
        default: null,
    },
    password:{
        type: String,
        default: null,
    },
    status:{
        type: Number,
        default: 0,
    },
    otp_verify:{
        type: Number,
        default: 0,
    },
    first_login:{
        type: Number,
        default: 0,
    },
    transaction_login:{
        type: Number,
        default: 0,
    },
    looking_for:{
        type:Number,
        default: 0,
    },
    st_customid:{
        type:String,
        default: "0",
    },
    stripe_id: {
        type: String,
        default: null,
    },
    gictc_status:{
        type:Number,
        default:0 //0 is not member, 1 is member
    }

},
{
    timestamps: true,
});
module.exports =  mongoose.model('User', userSchema);
