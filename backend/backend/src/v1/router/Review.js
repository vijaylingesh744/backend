var router = require("express").Router();
const {AddReview,ListReview}=require("../controller/Review");

router.post("/review", AddReview)
router.get("/review/:id", ListReview)

module.exports = router;