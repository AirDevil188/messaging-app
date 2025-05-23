const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getChatroom = asyncHandler(async (req, res, next) => {
  const { user } = req.user;
  const user2 = req.params.id;
  console.log(`user: ${user}`, `user2: ${user2}`);
  const conversation = await db.findChatroom(user, user2);
  console.log(conversation);
  return res.json(conversation);
});

module.exports = {
  getChatroom,
};
