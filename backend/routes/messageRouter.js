const { Router } = require("express");
const passport = require("passport");

const messageRouter = Router();
const messageController = require("../controllers/messageController");

messageRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  messageController.getMessages
);

module.exports = messageRouter;
