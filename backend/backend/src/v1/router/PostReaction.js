var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {AddPostReaction,ListPostReaction,DeletePostReaction,UpdatePostReaction}=require("../controller/PostReaction");

router.post("/post_reaction", AddPostReaction)
router.get("/post_reaction", ListPostReaction)
router.get("/post_reaction/delete/:itemId", DeletePostReaction)
router.post("/post_reaction/update/:itemId", UpdatePostReaction)

module.exports = router;