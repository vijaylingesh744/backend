const { AddPagePost, ListPostByPage, deletepagepost,UpdatepagePost } = require('../controller/PagePost')

var router = require('express').Router()


router.post("/add/pagepost", AddPagePost)
router.get('/pagepost/:id', ListPostByPage)
router.get('/delete/pagepost/:id',deletepagepost)
router.post('/update/pagepost',UpdatepagePost)


module.exports = router;