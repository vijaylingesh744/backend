var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {AddPost,ListPost,DeletePost,UpdatePost,ListScrap,UserPost, RecallPost, RecommendedPost}=require("../controller/Post");

router.post("/post", AddPost)
router.get("/post", ListPost)
router.get("/recommended/post", RecommendedPost)
router.get("/user_post", UserPost)
router.get("/post/delete/:itemId", DeletePost)
router.post("/post/update", UpdatePost)
router.get("/scrap/list", ListScrap)
router.get("/recall/post",RecallPost)

module.exports = router;