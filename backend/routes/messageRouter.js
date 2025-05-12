const { Router } = require("express");
const passport = require("passport");

const messageRouter = Router();
const messageController = require("../controllers/messageController");

messageRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  messageController.createMessage
);

messageRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  messageController.getMessageConversation
);

module.exports = messageRouter;
