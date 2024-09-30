var router = require("express").Router();
const { AddSubTransaction, ListSubTransaction } = require("../controller/BuyPlan");
const {getCurrentUser}=require("../middleware/CheckUser");

router.post('/add/plan',AddSubTransaction);
router.get('/list/plan',ListSubTransaction);

module.exports = router