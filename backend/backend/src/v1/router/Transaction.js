var router = require("express").Router();
const {addTransaction,ListTransaction,ListNotify,ListBpNotify,
    updateInvoice,updateInvoiceItem,InvoiceTransaction,PaymentCard} = require("../controller/Transaction");

router.post("/transaction/add", addTransaction)
router.post("/invoice_trans/add", InvoiceTransaction)
router.get("/othernotify/:id", ListNotify)
router.get("/listnotify/:id", ListBpNotify)
router.get("/updateinvoice/:id", updateInvoice)
router.post("/updateinvoiceItem/:id", updateInvoiceItem)
router.get("/listtransaction/:id/:receiver/:type/:projectId", ListTransaction)
router.post("/addpayment", PaymentCard);

module.exports = router;

