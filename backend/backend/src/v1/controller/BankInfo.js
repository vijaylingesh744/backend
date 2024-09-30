const BankInfo = require("../modal/BankInfo");
let Validator = require("validatorjs");
const responseHandlier = require('../Utils/response/status');
const BusinessInfo = require('../modal/BusinessInfo')
const License = require('../modal/License')
const Industry = require("../modal/Industry");
const User = require("../modal/User");
const { createJwtToken } = require("../middleware/CheckUser")
const PersonalSkills = require('../modal/PersonalSkills')
exports.AddBankInfo = async (req, res) => {
    try {
        const newBankInfo = new BankInfo({
            account_number: req.body.account_number,
            institution_number: req.body.institution_number,
            transit_number: req.body.transit_number,
            user_id: req.body.user_id,
        });
        await newBankInfo.save();
        const { user_id } = req.body
        const bankInfoData = await BankInfo.findOne({ user_id });
        const Licensedata = await License.find({ user_id });
        const businessInfoData = await BusinessInfo.findOne({ user_id }).exec();
        const businessInfoData1 = await BusinessInfo.find({ user_id }).exec();
        const personalSkills = await PersonalSkills.find({ user_id }).exec();
        const user = await User.findOne({ _id: user_id },{ password: 0, otp: 0 }).exec();
        const UserDetail = {
            'BusinessInfoData': businessInfoData,
            'BankInfoData': bankInfoData,
            'License': Licensedata,
            'user': user,
            'personalSkills': personalSkills,
        }
        var interest = await businessInfoData1.map(item => item.area_of_interest.length)
        const tokenData = { sub: user.username };
        const accessToken = createJwtToken(tokenData);
        var dataObject = { access_token: accessToken, token_type: 'bearer', user, data: UserDetail, is_interest: interest.length >= 1, status: true };
        return responseHandlier.successResponse(true, dataObject, res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};

exports.ListBankInfo = async (req, res) => {
    const items = await BankInfo.find();
    return responseHandlier.successResponse(true, items, res);
};

exports.DeleteBankInfo = async (req, res) => {
    try{
        const item = await BankInfo.findById(req.params.itemId);
        if (!item) { return responseHandlier.errorResponse(false, 'BankInfo not found', res); }
        await BankInfo.findByIdAndDelete(req.params.itemId);
        return responseHandlier.successResponse(true, 'BankInfo deleted successfully', res);
    }catch(err){
        return responseHandlier.errorResponse(false, err.message, res);
    }
};

exports.UpdateBankInfo = async (req, res) => {
    try {
        const item = await BankInfo.findById(req.params.itemId);
        if (!item) { return responseHandlier.errorResponse(false, 'BankInfo not found', res); }

        await BankInfo.findByIdAndUpdate(req.params.itemId, {
            account_number: req.body.account_number,
            institution_number: req.body.institution_number,
            transit_number: req.body.transit_number,
            user_id: req.body.user_id,
        });
        return responseHandlier.successResponse(true, 'BankInfo updated successfully', res);
    } catch (err) {
        return responseHandlier.errorResponse(false, err.message, res);
    }
};