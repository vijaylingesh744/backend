var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {AddQualification}=require("../controller/Qualification");

router.post("/qualification", AddQualification)

module.exports = router;