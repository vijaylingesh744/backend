var router = require("express").Router();
const {AddContact}=require("../controller/ContactSync");
router.post("/contact/add", AddContact)
module.exports = router;