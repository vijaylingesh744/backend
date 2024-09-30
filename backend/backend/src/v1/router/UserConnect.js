var router = require("express").Router();
const {ListUserConnect,AddUserConnect,
    DeleteUserConnect,
    clientList,
    UpdateUserConnect,UserList,CloneUpdateUserConnect}=require("../controller/UserConnect");

router.post("/userconnect/add", AddUserConnect)
router.get("/userconnect/:sender/:receiver", ListUserConnect)
router.get("/deleteconnect/:itemId", DeleteUserConnect)
router.get("/chatclient/:itemId", clientList)
router.post("/updateconnect/:id/:status", UpdateUserConnect)
router.get("/cloneupdateconnect/:id/:status", CloneUpdateUserConnect)
router.get("/userConnectlist/:id", UserList)

module.exports = router;