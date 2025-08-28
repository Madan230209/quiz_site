var express = require("express");
const {
  createQuestionSetController,
} = require("../controller/adminController");
const { adminOnlyMiddleware } = require("../middleware/RoleMiddleware");
const { validateTokenMiddleware } = require("../middleware/AuthMiddleware");

var router = express.Router();

router.post("/questionset/create",validateTokenMiddleware,adminOnlyMiddleware,createQuestionSetController);

module.exports = router;