var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {AddBusinessInfo,
    ListBusinessInfo,
    DeleteBusinessInfo,
    UpdateBusinessInfo,
    GetNotification,
    GetClient
}=require("../controller/BusinessInfo");

router.post("/business_info",  AddBusinessInfo)
router.get("/business_info",  ListBusinessInfo)
router.get("/business_info/delete/:itemId",  DeleteBusinessInfo)
router.post("/business_info/update/:itemId",  UpdateBusinessInfo)
router.get("/client_notify/:id/:type",GetNotification)
router.get("/get_client/:id",GetClient)

module.exports = router;