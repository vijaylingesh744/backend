var router = require("express").Router();
const {AddDesignation,ListDesignation}=require("../controller/Designation");

router.post("/add/designation", AddDesignation)
router.get("/list/designation", ListDesignation)

module.exports = router;
// AddDesignation
// ListDesignation