var router = require("express").Router();
const { AddPage, ListPage, ListIdPage,ListDataPage,
        CheckPageTitleExists,getUserpage,updatepage,listpostPage } = require("../controller/Page");
        
router.post('/add/page', AddPage)
router.get('/list/page', ListPage)
router.get('/page/:id', ListIdPage)
router.get('/admin_page/:id', getUserpage)
router.post('/update_page/:id', updatepage)
router.get('/page_view/:id', ListDataPage)
router.get('/check/pagetitle',CheckPageTitleExists)
router.get('/post/page/:id',listpostPage)


module.exports = router;