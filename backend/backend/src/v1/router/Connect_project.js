var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {
    ListConnectProject,
    ListProject,
    UpdateConnectProject,
    AddConnectProject}=require("../controller/Connect_project");

router.post("/add/connection", AddConnectProject)
router.get("/list/connection/:id", ListConnectProject)
router.get("/list/project/:id", ListProject)
router.post("/update/connection/:status", UpdateConnectProject)

module.exports = router;