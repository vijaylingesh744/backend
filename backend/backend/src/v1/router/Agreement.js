var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {AddAgreement,ListAgreement,DeleteAgreement,UpdateAgreement,ListBpNotification,UpdateBpNotification}=require("../controller/Agreement");

router.post("/agreement", AddAgreement)
router.get("/agreement", ListAgreement)
router.delete("/agreement/delete/:itemId", DeleteAgreement)
router.post("/agreement/update/:itemId", UpdateAgreement)
router.get("/notify_list/:id", ListBpNotification)
router.post("/notify_update", UpdateBpNotification)

module.exports = router;