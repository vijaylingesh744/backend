var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {ListChatlist,AddChatlist,DemoFireBase,LastMsg}=require("../controller/ChatList");

router.post("/chatlist/add", AddChatlist)
router.get("/chatlist/:id", ListChatlist)
router.post("/set_notify/:id", DemoFireBase)
router.post("/last_msg", LastMsg)

module.exports = router;