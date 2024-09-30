// CreatePageAdmin

const { CreatePageAdmin,AdminPagelist,ExistsAdmin,RemoveUserFromPageAdmin } = require('../controller/PageAdmin')

var router = require('express').Router()


router.post("/add/page_admin", CreatePageAdmin)
router.get("/user_role_page/:id", AdminPagelist)
router.get("/exist/page_admin/:id", ExistsAdmin)
router.get("/remove/page_admin/:page_id/:userId", RemoveUserFromPageAdmin)


module.exports = router;