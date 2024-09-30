var router = require("express").Router();
const {AddUser,LoginUser,ListUser,UserFilter,DeleteUser,UserDetails,
    Verifyotp,AddLicense,UpdateUser,sendEmail,VerifyPassword,AddProfile,
    VerifyEmail,
    SendUserOTP}=require("../controller/User");
const User = require("../modal/User");

router.post("/add/user", AddUser)
router.post("/check/user", LoginUser)
router.get("/list/user", ListUser)
router.get("/delete/user/:id", DeleteUser)
router.post("/update/user/:id", UpdateUser)
router.get("/detail/user/:id", UserDetails)
router.post("/user/filter", UserFilter)
router.post("/user/verify", Verifyotp)
router.get("/user/email_verify/:email", VerifyEmail)
router.post("/user/sendemail", sendEmail)
router.post("/user/password", VerifyPassword)
router.post("/add/license", AddLicense)
router.post("/user/profile", AddProfile)
router.post('/user/otp',SendUserOTP)
router.get('/user_count',async(req,res)=>res.json({data:await User.countDocuments()}))

module.exports = router;

