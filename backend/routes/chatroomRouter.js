const { Router } = require("express");
const passport = require("passport");

const chatroomController = require("../controllers/chatroomController");

const chatroomRouter = Router();

chatroomRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  chatroomController.getChatroom
);

module.exports = chatroomRouter;
