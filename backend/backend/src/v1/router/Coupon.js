var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {AddCoupon,ListCoupon,DeleteCoupon,UpdateCoupon}=require("../controller/Coupon");

router.post("/coupon", AddCoupon)
router.get("/coupon", ListCoupon)
router.delete("/coupon/delete/:itemId", DeleteCoupon)
router.post("/coupon/update/:itemId", UpdateCoupon)

module.exports = router;