var router = require("express").Router();
const {AddComments,ListComments,DeleteComments,UpdateComments}=require("../controller/Comment");

router.post("/comment", AddComments)
router.get("/comment/:id", ListComments)
router.get("/comment/delete/:itemId", DeleteComments)
router.post("/comment/update/:itemId", UpdateComments)

module.exports = router;