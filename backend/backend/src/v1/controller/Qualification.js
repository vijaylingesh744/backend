const Qualification = require("../modal/Qualification");
var formidable = require("formidable");
const imageUpload = require('../Utils/ImageUpload');
const responseHandlier = require('../Utils/response/status');

exports.AddQualification = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
        return res.status(400).json({ message: "Request must be a multipart form data" });
    }
    form.parse(req, async (err, fields, files) => {
        try {
            if(err){
                return res.status(500).json({ message: "Error parsing form data", status: false });
            }
            const reqdata = JSON.parse(fields.data);
            const AlreadyExists = await Qualification.findOne({user_id: reqdata.user_id});
            if(AlreadyExists){
                return res.status(400).json({ message: 'user already registered', status: false });
            }
            var file = await imageUpload(files.certificate);
            if(file?.length>1){
                file = file
            }else if(file?.length==1){
                file = [file]
            }else{
                file = []
            }
            const newQualification = new Qualification({
                university: reqdata.university,
                academic_year: reqdata.academic_year,
                major: reqdata.major,
                course: reqdata.course,
                description: reqdata.description,
                user_id: reqdata.user_id,
                certificate: file
            });
            await newQualification.save();
            return res.json({ message: 'Qualification stored successfully', status: true, data: newQualification });
        } catch (err) {
            return responseHandlier.errorResponse(false,err.message, res);
        }
    })
};


