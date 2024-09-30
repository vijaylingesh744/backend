var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {AddSubscription,ListSubscription,DeleteSubscription,UpdateSubscription}=require("../controller/Subscription");

router.post("/subscription", AddSubscription)
router.get("/subscription", ListSubscription)
router.delete("/subscription/delete/:itemId", DeleteSubscription)
router.post("/subscription/update/:itemId", UpdateSubscription)

module.exports = router;