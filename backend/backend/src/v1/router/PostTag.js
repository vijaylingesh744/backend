var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {AddPostTag,ListPostTag,DeletePostTag,UpdatePostTag}=require("../controller/PostTag");

router.post("/post_tag", AddPostTag)
router.get("/post_tag", ListPostTag)
router.delete("/post_tag/delete/:itemId", DeletePostTag)
router.post("/post_tag/update/:itemId", UpdatePostTag)

module.exports = router;