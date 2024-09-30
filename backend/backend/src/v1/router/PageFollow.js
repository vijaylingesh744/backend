const { AddPagePost, ListPostByPage } = require('../controller/PagePost')
const { AddPageFollowers, ListPageFollowers, 
    DeletePageFollowers,UserFollowers, getFollowedPage,UserRequest,PageFollowUpdate

 } = require('../controller/PageFollower')
var router = require('express').Router()

router.post("/add/follow/:id", AddPageFollowers)
router.get("/list/follow/:id/:user_id", ListPageFollowers)
router.get("/user/follow/:id", UserFollowers)
router.get("/remove/follow/:id/", DeletePageFollowers)
router.get("/pagefollow/update/:status/:id", PageFollowUpdate)
router.get("/listpost/:id",getFollowedPage)
router.get("/user_request/:id/:page_id",UserRequest)

module.exports = router;