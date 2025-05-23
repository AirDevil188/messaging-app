const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getAllMessages = asyncHandler(async (req, res, next) => {
  const userId = req.user.user;
  const messages = await db.getMessages(userId);

  return res.json(messages);
});

const createMessage = asyncHandler(async (req, res, next) => {
  const { text } = req.body;
  const { user } = req.user;
  const { id } = req.params;
  const chatroom = await db.findChatroom();

  if (chatroom) {
    const message = await db.createMessage(text, user, id, chatroom.id);
    return res.json(message);
  }
  const message = await db.createMessage(text, user, id, "");
  return res.json(message);
});

module.exports = {
  createMessage,
  getAllMessages,
};
