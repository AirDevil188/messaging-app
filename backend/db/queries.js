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

async function getMessages(user) {
  try {
    return prisma.messages.findMany({
      where: {
        user: user,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  findUser,
  createUser,
  deserializeUser,
  getMessages,
};
