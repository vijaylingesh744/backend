var router = require("express").Router();
const {getCurrentUser}=require("../middleware/CheckUser");
const {AddBankInfo,ListBankInfo,DeleteBankInfo,UpdateBankInfo}=require("../controller/BankInfo");

router.post("/bank_info",  AddBankInfo)
router.get("/bank_info",  ListBankInfo)
router.get("/bank_info/delete/:itemId",  DeleteBankInfo)
router.post("/bank_info/update/:itemId",  UpdateBankInfo)

module.exports = router;