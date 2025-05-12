const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getAllMessages = asyncHandler(async (req, res, next) => {
  const userId = req.user.user;
  const messages = await db.getMessages(userId);
  console.log(messages);

  return res.json(messages);
});

const getMessageConversation = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { user } = req.user;
  const conversation = await db.getMessageConversation(id, user);

  return res.json(conversation);
});

const createMessage = asyncHandler(async (req, res, next) => {
  const { text, sentToUserId, userId } = req.body;
  const conversation = await db.findChatroom(userId, sentToUserId);

  if (!conversation) {
    const chatroom = await db.createChatroom();
    const message = await db.createMessage(
      text,
      userId,
      sentToUserId,
      chatroom.id
    );
    return res.json(message);
  }
  const message = await db.createMessage(
    text,
    userId,
    sentToUserId,
    conversation.id
  );

  return res.json(message);
});

module.exports = {
  getMessageConversation,
  createMessage,
  getAllMessages,
};
