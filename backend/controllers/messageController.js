const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getAllMessages = asyncHandler(async (req, res, next) => {
  const { user } = req.user;

  const chatrooms = await db.getAllChatRooms(user);

  return res.json(chatrooms);
});

const getUsersMessages = asyncHandler(async (req, res, next) => {
  const { user } = req.user;
  const user2 = req.params.id;
  const conversation = await db.findChatroomMessages(user, user2);
  return res.json(conversation);
});

const createMessageChatroom = asyncHandler(async (req, res, next) => {
  const { text, chatroomId, userId } = req.body;
  const { user } = req.user;
  const { id } = req.params;
  console.log(user, userId);

  const message = await db.createMessage(text, user, userId, chatroomId);
  return res.json(message);
});

const createMessage = asyncHandler(async (req, res, next) => {
  const { text } = req.body;
  const { user } = req.user;
  const { id } = req.params;
  const chatroom = await db.findChatroomMessages(user, id);

  if (chatroom) {
    const message = await db.createMessage(text, user, id, chatroom.id);
    return res.json(message);
  }

  const message = await db.createMessage(text, user, id, "");
  return res.json(message);
});

module.exports = {
  createMessageChatroom,
  getAllMessages,
  getUsersMessages,
  createMessage,
};
