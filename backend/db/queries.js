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
      omit: {
        password: true,
      },
      include: {
        chatroom: {
          include: {
            messages: {},
          },
        },
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

async function getMessageConversation(userId, id) {
  try {
    return prisma.chatroom.findFirst({
      where: {
        id: id,
      },
      include: {
        users: {
          where: {
            NOT: {
              id: userId,
            },
          },
        },
        messages: {},
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function createMessage(text, user_1, user_2, chatroomId) {
  try {
    return prisma.chatroom.upsert({
      where: {
        id: chatroomId,
      },
      update: {
        messages: {
          create: {
            text: text,
            userId: user_1,
            secondUserId: user_2,
          },
        },
      },
      create: {
        messages: {
          create: {
            text: text,
            userId: user_1,
            secondUserId: user_2,
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function findChatroom(user_1, user_2) {
  try {
    return prisma.chatroom.findFirst({
      where: {
        OR: [
          {
            messages: {
              some: {
                userId: user_1,
                secondUserId: user_2,
              },
            },
          },
          {
            messages: {
              some: {
                userId: user_2,
                secondUserId: user_1,
              },
            },
          },
        ],
      },

      include: {
        messages: {
          include: {
            user: {},
          },
        },
        users: {
          omit: {
            password: true,
          },
        },
      },
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
};
