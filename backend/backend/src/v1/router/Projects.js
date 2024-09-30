var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {AddProjects,listProject,UpdateProject,getProject}=require("../controller/Projects");

router.post("/addproject",AddProjects)
router.get("/listprojects/:id",listProject)
router.get("/projectstage/:id",getProject)
router.get("/updateprojects/:id/:StageId",UpdateProject)

module.exports = router;