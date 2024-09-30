var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {AddEvent,ListEvent,DeleteEvent,UpdateEvent,ListUserEvent}=require("../controller/Event");

router.post("/event", AddEvent)
router.get("/event", ListEvent)
router.get("/event/:id", ListUserEvent)
router.get("/event/delete/:itemId", DeleteEvent)
router.post("/event/update/:itemId", UpdateEvent)

module.exports = router;