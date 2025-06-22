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

async function getLoggedInUser(userId) {
  try {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      omit: {
        password: true,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function findUsers(userId) {
  try {
    return await prisma.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
      omit: {
        password: true,
      },
      include: {
        chatroom: {
          where: {
            users: {
              some: {
                id: userId,
              },
            },
          },
          include: {
            messages: {},
            users: {
              where: {
                NOT: {
                  id: userId,
                },
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

async function getGlobalChatroom() {
  try {
    return prisma.chatroom.findFirst({
      include: {
        messages: {
          include: {
            user: {
              omit: {
                password: true,
                imageUrl: true,
              },
            },
          },
        },
      },
      where: {
        name: "Global",
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function createMessageGlobalChatroom(text, user_1, chatroomId) {
  try {
    return prisma.chatroom.upsert({
      where: {
        id: chatroomId,
      },
      update: {
        users: {
          connect: { id: user_1 },
        },
        messages: {
          create: {
            text: text,
            userId: user_1,
          },
        },
      },
      create: {
        messages: {
          create: {
            text: text,
            userId: user_1,
          },
        },
      },
      omit: {
        id: true,
      },
      include: {
        messages: {
          include: {
            user: {
              omit: {
                password: true,
                imageUrl: true,
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

async function createMessage(text, user_1, user_2, chatroomId) {
  try {
    return prisma.chatroom.upsert({
      where: {
        id: chatroomId,
      },
      update: {
        users: {
          connect: [{ id: user_1 }, { id: user_2 }],
        },
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
        users: {
          connect: [{ id: user_1 }, { id: user_2 }],
        },
      },

      omit: {
        id: true,
      },
      include: {
        messages: {
          include: {
            user: {
              omit: {
                password: true,
                imageUrl: true,
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

async function findChatroom(chatroomId) {
  try {
    return prisma.chatroom.findFirst({
      where: {
        id: chatroomId,
      },
      include: {
        messages: {
          include: {
            user: {
              omit: {
                password: true,
                imageUrl: true,
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

async function findChatroomMessages(user_1, user_2) {
  try {
    return prisma.chatroom.findFirst({
      where: {
        messages: {
          some: {
            OR: [
              { secondUserId: user_2, userId: user_1 },
              { secondUserId: user_1, userId: user_2 },
            ],
          },
        },
      },
      include: {
        messages: {
          include: {
            user: {
              omit: {
                password: true,
                imageUrl: true,
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

async function getAllChatRooms(userId) {
  try {
    return prisma.chatroom.findMany({
      where: {
        name: null,
        users: {
          some: {
            id: userId,
          },
        },
      },

      include: {
        messages: {},
        users: {
          include: {
            messages: {},
          },
          where: {
            NOT: {
              id: userId,
            },
          },
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
  getLoggedInUser,
  findChatroom,
  findChatroomMessages,
  getAllChatRooms,
  getGlobalChatroom,
  createUser,
  deserializeUser,
  getMessages,
  getMessageConversation,
  createMessage,
  createMessageGlobalChatroom,
};
