const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getChatroom = asyncHandler(async (req, res, next) => {
  const { user } = req.user;
  const user2 = req.params.id;
  const conversation = await db.findChatroom(user, user2);
  return res.json(conversation);
});

const getGlobalChatroom = asyncHandler(async (req, res, next) => {
  const globalChatroom = await db.getGlobalChatroom();
  return res.json(globalChatroom);
});

const createMessageGlobalChatroom = asyncHandler(async (req, res, next) => {
  const { user } = req.user;
  const { text, chatroomId } = req.body;

  const message = await db.createMessageGlobalChatroom(text, user, chatroomId);
  return res.json(message);
});

module.exports = {
  getChatroom,
  getGlobalChatroom,
  createMessageGlobalChatroom,
};
