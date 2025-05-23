const { Router } = require("express");
const passport = require("passport");

const messageRouter = Router();
const messageController = require("../controllers/messageController");

messageRouter.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  messageController.createMessage
);

module.exports = messageRouter;
