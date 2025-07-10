const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const publicChatroom = async () => {
  return await prisma.chatroom.create({
    data: {
      name: "Global",
    },
  });
};

publicChatroom();
