const User = require("../modal/User");
let Validator = require("validatorjs");
var formidable = require("formidable");
const bcrypt = require('bcrypt');
const imageUpload = require('../Utils/ImageUpload');
const { createJwtToken } = require("../middleware/CheckUser")
const KeyData = require('../Utils/Keyjson')
const BankInfo = require('../modal/BankInfo')
const BusinessInfo = require('../modal/BusinessInfo')
const PersonalSkills = require('../modal/PersonalSkills')
const License = require('../modal/License')
var nodemailer = require("nodemailer");
const { generateotp } = require('../Utils/Keyjson')
const Scrap = require('../modal/Scrap')
const responseHandlier = require('../Utils/response/status');
const { default: mongoose } = require("mongoose");
const schedule = require('node-schedule');

exports.AddUser = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
        return responseHandlier.errorResponse(false, "Request must be a multipart form data", res);
    }
    form.parse(req, async (err, fields, files) => {
        try {
            if (err) {
                return responseHandlier.errorResponse(false, err, res);
            }
            const reqdata = JSON.parse(fields.data);
            const rules = {
                // first_name: "required",
                // last_name: "required",
                gmail: "required",
            };
            const validation = new Validator(reqdata, rules);
            if (validation.fails()) {
                return responseHandlier.errorResponse(false, "Please send mandatory fields", res);
            }
            var hashedPassword = "";
            if (reqdata.password) {
                hashedPassword = await bcrypt.hash(reqdata.password, 10);
            }
            var existingUser = false;
            if (reqdata.gmail) {
                existingUser = await User.findOne({ gmail: reqdata.gmail });
            } else {
                existingUser = await User.findOne({ phone: reqdata.phone });
            }
            if (existingUser) {
                var ErrorMsg = existingUser.gmail == reqdata.gmail ? 'Email already registered' : 'Phone number already registered';
                return responseHandlier.errorResponse(false, ErrorMsg, res);
            }
            var profile = "";
            if (!reqdata.profile && files.profile) {
                profile = await imageUpload(files.profile);
                profile = KeyData.baseUrl + "/" + profile;
            } else {
                profile = reqdata.profile;
            }
            var username = KeyData.genrate()
            const otp = await generateotp();
            const newUser = new User({
                username: username,
                first_name: reqdata.first_name,
                last_name: reqdata.last_name,
                gmail: reqdata.gmail,
                google_id: reqdata.google_id,
                user_type: reqdata.user_type,
                profile: profile,
                login_type: reqdata.login_type,
                phone: reqdata.phone,
                date_of_birth: reqdata.date_of_birth,
                gender: reqdata.gender,
                country: reqdata.country,
                designation: reqdata.designation,
                city: reqdata.city,
                password: hashedPassword || "0",
                otp: otp
            });
            var data = await newUser.save()
            await sendEmail(reqdata.gmail, otp).then(() => console.log('Email sent successfully'))
                .catch(error => console.error('Failed to send email:', error));
            const tokenData = { sub: username };
            const accessToken = createJwtToken(tokenData);
            return responseHandlier.successResponse(true, { data: data, access_token: accessToken, token_type: 'bearer' }, res);
        } catch (error) {
            return responseHandlier.errorResponse(false, error.message, res);


        }
    })
};

exports.SendUserOTP = async (req, res) => {
        try{
            var user = await User.findOne( {gmail: req.body.gmail} );
            if (!user) {
                return responseHandlier.errorResponse(false, 'No Gmail matched', res);
            }else{
                await sendEmail(req.body.gmail, req.body.otp).then(() => console.log('Email sent successfully'))
                .catch(error => console.error('Failed to send email:', error));
                return responseHandlier.successResponse(true, 'OTP sent in email',res);
            }


        }catch(err){
            return responseHandlier.errorResponse(false, err.message, res);
        }

}

exports.LoginUser = async (req, res) => {
    try {
        const rules = {
            gmail: "required",
        };
        const validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return responseHandlier.errorResponse(false, validation.errors.all(), res);
        }
        var user = await User.findOne({ $or: [{ gmail: req.body.gmail }, { phone: req.body.gmail }] });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return responseHandlier.errorResponse(false, 'Incorrect username or password', res);
        }
        delete user.password;
        delete user.otp;

        const tokenData = { sub: user.username };
        const accessToken = createJwtToken(tokenData);
        const { device_token, device_type } = req.body;
        if (device_token) {
            var dataObject = { device_token: device_token, device_type: device_type }
            user = await User.findByIdAndUpdate(
                user._id,
                dataObject,
                { new: true }
            );
        }
        var user_id = user._id
        const bankInfoData = await BankInfo.findOne({ user_id });
        const Licensedata = await License.find({ user_id });
        const businessInfoData1 = await BusinessInfo.find({ user_id }).exec();
        const personalSkills = await PersonalSkills.find({ user_id }).exec();
        // const UserData = await User.findById(user_id).exec();
        const userIdObjectId = mongoose.Types.ObjectId.isValid(user_id) ? new mongoose.Types.ObjectId(user_id) : null;
        const UserData = await User.aggregate([
            // Stage 1: Lookup sender details from chatlists
            {
              $lookup: {
                from: "chatlists",
                localField: "_id",
                foreignField: "sender",
                as: "senderDetails"
              }
            },
            // Stage 2: Lookup receiver details from chatlists
            {
              $lookup: {
                from: "chatlists",
                localField: "_id",
                foreignField: "receive",
                as: "receiveDetails"
              }
            },
            // Stage 3: Add fields to count the number of senderDetails and receiveDetails
            {
                $addFields: {
                  senderDetails: {
                    $filter: {
                      input: "$senderDetails",
                      as: "detail",
                      cond: { $eq: ["$$detail.status", 1] }
                    }
                  },
                  receiveDetails: {
                    $filter: {
                      input: "$receiveDetails",
                      as: "detail",
                      cond: { $eq: ["$$detail.status", 1] }
                    }
                  }
                }
            },
        {
              $addFields: {
                senderDetailsCount: { $size: "$senderDetails" },
                receiveDetailsCount: { $size: "$receiveDetails" }
              }
            },
            // Stage 4: Add field to calculate the total count
            {
              $addFields: {
                totalconnection: {
                  $add: ["$senderDetailsCount", "$receiveDetailsCount"]
                }
              }
            },
            // Stage 5: Match the specific user by _id
            {
              $match: {
                _id: userIdObjectId,
              }
            },
            // Stage 6: Exclude sensitive fields (password and otp) if needed
            {
              $project: {
                password: 0,
                otp: 0
              }
            }
          ]).exec();
       
          
        const UserDetail = {
            'BusinessInfoData': businessInfoData1,
            'BankInfoData': bankInfoData,
            'License': Licensedata,
            'user': UserData[0],
            'personalSkills': personalSkills,
        }
        var interest = await businessInfoData1.map(item => item.area_of_interest.length)
        var dataObject = { access_token: accessToken, token_type: 'bearer', user, data: UserDetail, is_interest: interest.length >= 1, status: true };
        return responseHandlier.successResponse(true, dataObject, res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);

    }
};

exports.UserDetails = async (req, res) => {
    try {
        var user_id = req.params.id
        const bankInfoData = await BankInfo.findOne({ user_id });
        const Licensedata = await License.find({ user_id }).exec();
        // const userData = await User.findOne({ _id: user_id },{ password: 0, otp: 0 });
        const userIdObjectId = mongoose.Types.ObjectId.isValid(user_id) ? new mongoose.Types.ObjectId(user_id) : null;
        const personalSkills = await PersonalSkills.find({ user_id }).exec();

        const UserData = await User.aggregate([
            // Stage 1: Lookup sender details from chatlists
            {
              $lookup: {
                from: "chatlists",
                localField: "_id",
                foreignField: "sender",
                as: "senderDetails"
              }
            },
            // Stage 2: Lookup receiver details from chatlists
            {
              $lookup: {
                from: "chatlists",
                localField: "_id",
                foreignField: "receive",
                as: "receiveDetails"
              }
            },
            // Stage 3: Add fields to count the number of senderDetails and receiveDetails
            {
                $addFields: {
                  senderDetails: {
                    $filter: {
                      input: "$senderDetails",
                      as: "detail",
                      cond: { $eq: ["$$detail.status", 1] }
                    }
                  },
                  receiveDetails: {
                    $filter: {
                      input: "$receiveDetails",
                      as: "detail",
                      cond: { $eq: ["$$detail.status", 1] }
                    }
                  }
                }
            },
        {
              $addFields: {
                senderDetailsCount: { $size: "$senderDetails" },
                receiveDetailsCount: { $size: "$receiveDetails" }
              }
            },
            // Stage 4: Add field to calculate the total count
            {
              $addFields: {
                totalconnection: {
                  $add: ["$senderDetailsCount", "$receiveDetailsCount"]
                }
              }
            },
            // Stage 5: Match the specific user by _id
            {
              $match: {
                _id: userIdObjectId,
              }
            },
            // Stage 6: Exclude sensitive fields (password and otp) if needed
            {
              $project: {
                password: 0,
                otp: 0
              }
            }
          ]).exec();
        const businessInfoData = await BusinessInfo.find({ user_id }).exec();

        const UserDetail = {
            'BusinessInfoData': businessInfoData,
            'BankInfoData': bankInfoData,
            'License': Licensedata,
            'user': UserData[0],
            'personalSkills': personalSkills,
        }
        return responseHandlier.successResponse(true, UserDetail, res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
}

exports.ListUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default page 1
        const limit = parseInt(req.query.limit) || 10; // Default limit 10
        const user_type = parseInt(req.query.type); // Get user type from query parameter
        const user_id = req.query.user_id; // Get user type from query parameter
        const title = req.query.search; // Get user type from query parameter
        let query = {};
        if (user_type !== -1 && !isNaN(user_type)) {
            query.user_type = user_type;
        }
        if (user_id) {
            query._id = { $ne: user_id };
        }
        if (title) {
            const titleRegex = new RegExp(title, 'i');
            query.$or = [
                { gmail: { $regex: titleRegex } },
                { first_name: { $regex: titleRegex } },
                { last_name: { $regex: titleRegex } },
            ];
        }

        const skip = (page - 1) * limit;
        const Overall = await User.find(query).exec(); // Get overall users co
        // const ListUsers = await User.find(query)
        //     .sort({ createdAt: -1 })
        //     .skip(skip)
        //     .limit(limit).exec();

        const totalCount = Overall.length;
        var data = {
            users: Overall,
            pagination: {
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                totalItems: totalCount
            }
        };
        return responseHandlier.successResponse(true, data, res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};

exports.UpdateUser = async (req, res) => {
    try {
        const data = req.body;
        let newUser;
        if (data.registerType == 'USER') {
            if (data.password) {
                const hashedPassword = await bcrypt.hash(data.password, 10);
                data.password = hashedPassword;
                newUser = await User.findByIdAndUpdate(req.params.id, data, { new: true });
            } else {
                newUser = await User.findByIdAndUpdate(req.params.id, data, { new: true });
            }
        } else if (data.registerType == 'BUSINESSINFO') {
            if (data?.NewData) {
                newUser = new BusinessInfo(data);
                await newUser.save()
            } else if (data?.UpdateData) {
                newUser = await BusinessInfo.findByIdAndUpdate(req.params.id, data, { new: true, upsert: true });
            } else {
                newUser = await BusinessInfo.findOneAndUpdate({ user_id: req.params.id }, data, { new: true, upsert: true });
            }
        } else if (data.registerType == 'LICENSE') {
            newUser = await UpdateLicense(req, res);
            newUser = true;
        } else if (data.registerType == 'PERSONALSKILL') {
            newUser = await PersonalSkills.findOneAndUpdate({ user_id: req.params.id }, data, { new: true, upsert: true });
            // newUser = true;
        } else if (data.registerType == 'BANKINFO') {
            newUser = await BankInfo.findOneAndUpdate({ user_id: req.params.id }, data, { new: true, upsert: true });
        } else {
            return responseHandlier.errorResponse(false, "Invalid register type", res);
        }
        if (!newUser) {
            return responseHandlier.errorResponse(false, "User Not Found", res);
        }
        await SendCompleteEmail();
        return responseHandlier.successResponse(true, newUser, res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
}

const UpdateLicense = (req, res) => {
    try {
        let newUser;
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return responseHandlier.errorResponse(false, err.message, res);
            }
            var PanCard = await imageUpload(files.PanCard);
            var AddressProof = await imageUpload(files.AddressProof);
            var NationalID = await imageUpload(files.NationalID);
            var BusinessRegister = await imageUpload(files.BusinessRegister);
            var GstCertificate = await imageUpload(files.GstCertificate);
            var BankPassbook = await imageUpload(files.BankPassbook);
            var ExportCopy = await imageUpload(files.ExportCopy);

            const data = {
                PanCard: PanCard,
                AddressProof: AddressProof,
                NationalID: NationalID,
                BusinessRegister: BusinessRegister,
                GstCertificate: GstCertificate,
                BankPassbook: BankPassbook,
                ExportCopy: ExportCopy,
                user_id: fields.user_id
            }

            Object.keys(data).forEach(key => {
                if (!data[key]) {
                    delete data[key];
                }
            });

            if (fields?.NewData) {
                newUser = new License(data);
                await newUser.save()
            } else if (fields?.UpdateData) {
                newUser = await License.findByIdAndUpdate(req.params.id, data, { new: true, upsert: true });
            } else {
                newUser = await License.findOneAndUpdate({ user_id: mongoose.Types.ObjectId(req.params.id) }, data, { new: true, upsert: true });
            }
            return newUser

        });
    } catch (error) {
        return error;
    }
}

exports.DeleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findOneAndDelete({ _id: req.params.id });
        return responseHandlier.successResponse(true, 'User Deleted successfully', res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
}

exports.UserFilter = async (req, res) => {
    try {
        const user_type = req.body.user_type;
        if (!user_type) {
            return responseHandlier.errorResponse(false, "User type is required", res);
        }
        const pipeline = [
            {
                $lookup: {
                    from: 'business_information',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'business_data'
                }
            },
            {
                $unwind: "$business_data"
            }
        ];

        if (req.body.industry) {
            pipeline.push({
                $match: {
                    "user_type": user_type,
                    "business_data.area_of_interest.title": req.body.industry
                }
            });
        } else {
            pipeline.push({
                $match: {
                    "user_type": user_type
                }
            });
        }

        const listUser = await User.aggregate(pipeline);

        return responseHandlier.successResponse(true, listUser, res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};

exports.sendEmail = async (req, res) => {
    const existingUser = await User.findOne({ gmail: req.body.gmail });
    if (existingUser) {
        const otp = await generateotp();
        const user = await User.findByIdAndUpdate(
            existingUser._id,
            { otp },
            { new: true }
        );
        await sendEmail(req.body.gmail, otp).then(() => responseHandlier.successResponse(true, existingUser, res))
            .catch(error => {
                return responseHandlier.errorResponse(false, error.message, res);
            });
    } else {
        return responseHandlier.errorResponse(false, 'Invalid Email', res);
    }
}

exports.VerifyPassword = async (req, res) => {
    try {
        const { user_id, password } = req.body;
        const user = await User.findOne({ _id: user_id });
        console.log(user)
        if (!user) {
            return responseHandlier.errorResponse(false, 'User not found.', res);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        return responseHandlier.successResponse(true, user, res);

    } catch (error) {
        return responseHandlier.errorResponse(false, error.message, res);
    }
}

exports.VerifyEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ $or: [{ gmail: email }, { phone: email }] });
        if (!user) return responseHandlier.errorResponse(false, "User Not Found", res);
        const tokenData = { sub: user.username };
        const accessToken = createJwtToken(tokenData);
        var user_id = user._id
        // const bankInfoData = await BankInfo.findOne({ user_id });
        // const businessInfoData = await BusinessInfo.findOne({ user_id }).exec();

        const bankInfoData = await BankInfo.findOne({ user_id });
        const Licensedata = await License.find({ user_id });
        const userData = await User.findOne({ _id: user_id },{ password: 0, otp: 0 });
        const businessInfoData = await BusinessInfo.find({ user_id }).exec();
        const personalSkills = await PersonalSkills.find({ user_id }).exec();

        const UserDetail = {
            'BusinessInfoData': businessInfoData,
            'BankInfoData': bankInfoData,
            'License': Licensedata,
            'user': userData,
            'personalSkills': personalSkills,
        }

        var responseArr = {
            token: accessToken,
            data: UserDetail,
            user,
            verifyotp: user.otp_verify == '0' ? false : true
        };

        return responseHandlier.successResponse(true, responseArr, res);
    } catch (error) {
        return responseHandlier.errorResponse(false, error.message, res);
    }
}

const sendEmail = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 587,
        secure: false,
        auth: {
            user: "pathways@qcodesinfotech.com",
            pass: "Qcodes@123"
        }
    });
    const otpUrl = 'http://connect-client.qcodesinfotech.com/otp/' + email;
    let mailOptions = {
        from: "pathways@qcodesinfotech.com",
        to: email,
        subject: 'Verify Email',
        html: `
<head>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="position: relative;">
    <div style="width: 800px; height: auto; border: 1px solid black; margin: auto;  border-top-left-radius: 9px; border-top-right-radius: 9px; padding: 0 40px; padding-bottom: 30px;"  >
        <div style="padding: 25px 50px;">
            <img src="http://connect-client.qcodesinfotech.com/images/feed_images/connect.png" style="width: 80px;" alt="logo-image">
        </div>
        <div>
            <h1 style="text-align: center; font-family: Poppins; margin: 0;">Verify Your Email</h1>
        </div>
        <div >
            <h3 style=" margin-left: 45px;font-family: Poppins; text-align: left; font-weight: 600;">Dear User,</h3>
            <p style="text-align: center; font-family: Poppins; margin: 0; margin-bottom: 20px; font-weight: 500; font-size: 1.1rem;">Please verfiy your email address by entering the OTP provided below:</p>
            <h2 style="text-align: center; font-family: Poppins; margin: 0; font-weight: 600; margin-bottom: 10px;">Verification Code</h2>
            <p style="text-align: center; font-family: Poppins; font-weight: 400; letter-spacing: 5px; font-size: 2.5rem;
            margin: 0; margin-bottom: 10px;">${otp}</p>
            <p style="text-align: center; font-family: Poppins; color: #ababab; margin: 0; margin-bottom: 22px;" >If you did not request this verification, Please ignore this email.</p>
            <p style=" font-family: Poppins; margin: 0;margin-left: 150px; margin-bottom: 10px;">Thankyou,</p>
            <p style=" font-family: Poppins; margin: 0; margin-left: 150px;">The Connect Team</p>
        </div>
    </div>
</body>
        `
    };
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return info.messageId;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw the error for further handling
    }
}

exports.Verifyotp = async (req, res) => {
    try {
        const { gmail, otp } = req.body;
        const user = await User.findOne({ gmail });
        if (!user) return responseHandlier.errorResponse(false, 'User not found.', res);
        if (user.otp == otp) {
            user.otp_verify = '1';
            await user.save();
            return responseHandlier.successResponse(true, user, res);
        } else {
            return responseHandlier.errorResponse(false, 'Invalid OTP.', res);
        }
    } catch (error) {
        return responseHandlier.errorResponse(false, error.message, res);
    }
};

exports.AddLicense = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return responseHandlier.errorResponse(false, err.message, res);
            }
            const AlreadyExists = await License.findOne({ user_id: fields.user_id });
            if (AlreadyExists) {
                return responseHandlier.errorResponse(false, 'user already registered', res);
            }
            var PanCard = await imageUpload(files.PanCard);
            var AddressProof = await imageUpload(files.AddressProof);
            var NationalID = await imageUpload(files.NationalID);
            var BusinessRegister = await imageUpload(files.BusinessRegister);
            var GstCertificate = await imageUpload(files.GstCertificate);
            var BankPassbook = await imageUpload(files.BankPassbook);
            var ExportCopy = await imageUpload(files.ExportCopy);
            const data = {
                user_id: fields.user_id,
                date_time: new Date(),
                PanCard: PanCard,
                AddressProof: AddressProof,
                NationalID: NationalID,
                BusinessRegister: BusinessRegister,
                GstCertificate: GstCertificate,
                BankPassbook: BankPassbook,
                ExportCopy: ExportCopy,
                status: 0
            }
            Object.keys(data).forEach(key => {
                if (!data[key]) {
                    delete data[key];
                }
            });
            const newPost = new License(data);
            await newPost.save();
            return responseHandlier.successResponse(true, newPost, res);
        });
    } catch (error) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};

exports.AddProfile = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return responseHandlier.errorResponse(false, err.message, res);
            }

            if (!files.Profile) {
                return responseHandlier.errorResponse(false, "image as Empty", res);
            }
            var Profile = await imageUpload(files.Profile);
            // console.log(req.query?.bgicon != "false"?"true":"false")
            // console.log(req.query?.bgicon)
            // console.log(fields.update[0])
            // return
            if (req.query?.bgicon != "false") {
                if (fields.update[0] != "false") {
                    var updateUser = await BusinessInfo.findByIdAndUpdate(fields.user_id, { business_logo: Profile }, { new: true });
                } else {
                    var updateUser = await BusinessInfo.findOneAndUpdate({ user_id: fields.user_id }, { business_logo: Profile }, { new: true });
                }
            } else {
                var updateUser = await User.findByIdAndUpdate(fields.user_id, { profile: Profile }, { new: true });
            }
            return responseHandlier.successResponse(true, updateUser, res);
        });
    } catch (error) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
}

const SendCompleteEmail = async (req, res) => {
    try {
        const UserData = await User.aggregate([
            {
                $lookup: {
                    from: 'business_information',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'business_data'
                }
            },
            {
                $unwind: "$business_data"
            },
            {
                $lookup: {
                    from: 'bankinformations',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'bankdata'
                }
            },
            {
                $unwind: "$bankdata"
            },
            {
                $lookup: {
                    from: 'licenses',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'license_data'
                }
            },
            {
                $unwind: "$license_data"
            },
            {
                $match: {
                    first_login: 1,
                }
            }
        ]).exec()

        let transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 587,
            secure: false,
            auth: {
                user: "pathways@qcodesinfotech.com",
                pass: "Qcodes@123"
            }
        });
        const emailPromises = UserData.map(async (item) => {
            const mailOptions = {
                from: "pathways@qcodesinfotech.com",
                to: item.gmail,
                subject: 'Registration completed - Connectsouq',
                html: `<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #28a745; font-size: 24px;">Registration Completed Successfully!</h1>
                <p style="color: #333; font-size: 16px;">Thank you for registering with ConnectSouq. Your account has been successfully created.</p>
                <p style="color: #333; font-size: 16px;">If you have any questions, please feel free to <a href="#" style="color: #007bff; text-decoration: none;">contact our support team</a>.</p>
                <div style="margin-top: 20px; font-size: 14px; color: #666;">
                    &copy; 2024 ConnectSouq Team
                </div>
            </div>`
            };
            try {
                let info = await transporter.sendMail(mailOptions);
                await User.findByIdAndUpdate(item._id, { first_login: 2 });
                console.log('Email sent:', info.messageId);
                return info.messageId;
            } catch (error) {
                console.error('Error sending email:', error);
                throw error; // Re-throw the error for further handling
            }
        });

        await Promise.all(emailPromises);
        console.log('Emails sent successfully');
    } catch (error) {
        console.error('Error in SendCompleteEmail function:', error);
        console.log(500).send('Internal Server Error');
    }
}

const job = schedule.scheduleJob('*/30 * * * *', async () => {
    try {
        console.log('Running the scheduled task every 30 minutes...');
        await SendCompleteEmail();
    } catch (error) {
        console.error('Error executing scheduled task:', error);
    }
});
// 


const DemoMailCheck = async () => {
    let transporter = nodemailer.createTransport({
        host: "smtpout.secureserver.net",
        port: 465,
        secure: false,
        auth: {
            user: "info@connectsouq.com",
            pass: "Connect@99"
        }
    });
    let mailOptions = {
        from: "info@connectsouq.com",
        to: "durai@yopmail.com",
        subject: 'Demo Mail',
        html: `
<head>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="position: relative;">
    <div style="width: 800px; height: auto; border: 1px solid black; margin: auto;  border-top-left-radius: 9px; border-top-right-radius: 9px; padding: 0 40px; padding-bottom: 30px;"  >
        <div style="padding: 25px 50px;">
            <img src="http://connect-client.qcodesinfotech.com/images/feed_images/connect.png" style="width: 80px;" alt="logo-image">
        </div>
        <div>
            <h1 style="text-align: center; font-family: Poppins; margin: 0;">Verify Your Email</h1>
        </div>
        <div >
            <h3 style=" margin-left: 45px;font-family: Poppins; text-align: left; font-weight: 600;">Dear User,</h3>
            <p style="text-align: center; font-family: Poppins; margin: 0; margin-bottom: 20px; font-weight: 500; font-size: 1.1rem;">Please verfiy your email address by entering the OTP provided below:</p>
            <h2 style="text-align: center; font-family: Poppins; margin: 0; font-weight: 600; margin-bottom: 10px;">Verification Code</h2>
            <p style="text-align: center; font-family: Poppins; color: #ababab; margin: 0; margin-bottom: 22px;" >If you did not request this verification, Please ignore this email.</p>
            <p style=" font-family: Poppins; margin: 0;margin-left: 150px; margin-bottom: 10px;">Thankyou,</p>
            <p style=" font-family: Poppins; margin: 0; margin-left: 150px;">The Connect Team</p>
        </div>
    </div>
</body>
        `
    };
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return info.messageId;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw the error for further handling
    }
}



// const dataPages = async()=>{
//     var data = await User.updateMany(
//         { about: null},
//         { $set:{about: "To drive successful business development, focus on identifying and leveraging market opportunities while building strong, strategic partnerships. Prioritize understanding client needs and delivering tailored solutions to foster long-term growth"} } 
//       );
//       console.log(data)
// };