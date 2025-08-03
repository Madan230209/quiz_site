var express = require("express");

const {
  createUserController,
  getUserController,
  loginHandleController,
  getUserListController,
} = require("../controller/userController");
const validateTokenMiddleware = require("../middleware/AuthMiddleWare");
var router = express.Router();

/* GET users listing. */
router.get("/", getUserController);

router.post("/create", createUserController);

router.post("/login", loginHandleController);

router.get("/list", validateTokenMiddleware, getUserListController);

module.exports = router;