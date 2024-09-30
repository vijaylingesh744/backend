var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {AddSkills,ListSkills,DeleteSkills,UpdateSkill,filter_user,CompanyData, filter_user_connection, 
    filter_pages,SearchData}=require("../controller/Skill");

router.post("/skill",  AddSkills)
router.get("/skill/:id",  ListSkills)
router.get("/skill/delete/:itemId",  DeleteSkills)
router.post("/skill/update/:itemId",  UpdateSkill)
router.post("/filter_user",  filter_user)
router.post("/filter_pages",  filter_pages)
router.post("/filter_user/connection",  filter_user_connection)
router.get("/commonsearch", SearchData)
router.get("/list/business",  CompanyData)

module.exports = router;