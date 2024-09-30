var router = require("express").Router();
const {
  addMessage,
} = require("../controller/MessageController");

router.post("/add-message", addMessage);


module.exports = router;
