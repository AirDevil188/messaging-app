const { Router } = require("express");
const passport = require("passport");

const chatroomController = require("../controllers/chatroomController");

const chatroomRouter = Router();

chatroomRouter.get(
  "/global",
  passport.authenticate("jwt", { session: false }),
  chatroomController.getGlobalChatroom
);

chatroomRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  chatroomController.getChatroom
);

chatroomRouter.post(
  "/global",
  passport.authenticate("jwt", { session: false }),
  chatroomController.createMessageGlobalChatroom
);

module.exports = chatroomRouter;
