const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getChatroom = asyncHandler(async (req, res, next) => {
  const { user } = req.user;
  const user2 = req.params.id;
  const conversation = await db.findChatroom(user, user2);
  return res.json(conversation);
});

module.exports = {
  getChatroom,
};
