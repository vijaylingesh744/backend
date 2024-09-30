var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {AddBpClient,ListBpClient}=require("../controller/Connection");

router.post("/add_client", AddBpClient)
router.get("/listclient/:id",ListBpClient)

module.exports = router;