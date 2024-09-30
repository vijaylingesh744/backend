var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {AddIndustry,ListIndustry,DeleteIndustry,UpdateIndustry,ListIndustrybyId}=require("../controller/Industry");

router.post("/industry",  AddIndustry)
router.get("/industry",  ListIndustry)
router.get("/industry/delete/:itemId",  DeleteIndustry)
router.post("/industry/update/:itemId",  UpdateIndustry)
router.post("/industry/list/:itemId",  ListIndustrybyId)


module.exports = router;