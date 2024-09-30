var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {AddBusinesscommunity, ListBusinessCommunity
}=require("../controller/BussinessCommunity");

router.post("/businesscommunity/add",  AddBusinesscommunity)
router.get("/businesscommunity/list/:id",  ListBusinessCommunity)


module.exports = router;