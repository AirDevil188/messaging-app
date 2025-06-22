const { Router } = require("express");
const passport = require("passport");

const messageRouter = Router();
const messageController = require("../controllers/messageController");

messageRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  messageController.getAllMessages
);

messageRouter.get(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  messageController.getUsersMessages
);

messageRouter.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  messageController.createMessageChatroom
);

messageRouter.post(
  "/create/:id",
  passport.authenticate("jwt", { session: false }),
  messageController.createMessage
);

module.exports = messageRouter;
