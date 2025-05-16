const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function findUser(username) {
  try {
    return await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function findUsers() {
  try {
    return await prisma.user.findMany({
      select: {
        username: true,
        id: true,
        imageUrl: true,
        sentMessages: true,
        receivedMessages: true,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function createUser(username, password) {
  try {
    await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function deserializeUser(id) {
  try {
    return prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getMessages(userId) {
  try {
    return prisma.messages.findMany({
      where: {
        userId: userId,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getMessageConversation(user_1, user_2) {
  try {
    return prisma.messages.findMany({
      where: {
        OR: [
          {
            userId: user_1,
            sentMessagesId: user_2,
          },
          {
            userId: user_2,
            sentMessagesId: user_1,
          },
        ],
      },
      orderBy: {
        timestamp: "asc",
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function createMessage(text, user_1, user_2, chatroomId) {
  try {
    return prisma.messages.create({
      data: {
        text: text,
        userId: user_1,
        sentMessagesId: user_2,
        chatroomId: chatroomId,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function findChatroom(userId, sentToUserId) {
  try {
    return prisma.chatroom.findFirst({
      where: {
        users: {
          every: {
            sentMessages: {
              every: {
                sentMessagesId: sentToUserId,
              },
            },
            receivedMessages: {
              every: {
                userId: userId,
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function createChatroom() {
  try {
    return prisma.chatroom.create({
      data: {},
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  findUser,
  findUsers,
  findChatroom,
  createUser,
  deserializeUser,
  getMessages,
  getMessageConversation,
  createMessage,
  createChatroom,
};
