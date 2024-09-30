var router = require("express").Router();
const { AddCode,CheckCode,ListCode,UpdateCode,
    DeleteCode} = require("../controller/Gictcode");


router.post('/add/code', AddCode)
router.get('/list/code', ListCode)
router.get('/check_code/:id', CheckCode)
router.post('/update/code/:id', UpdateCode)
router.get('/delete/code/:id', DeleteCode)


module.exports = router;