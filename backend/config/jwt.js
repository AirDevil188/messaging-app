const jwtWebToken = require("jsonwebtoken");
const dotEnv = require("dotenv");

dotEnv.config();

const generateToken = async (user) => {
  return jwtWebToken.sign(
    {
      user: user.id,
    },
    process.env.SECRET,
    {
      expiresIn: "4h",
    }
  );
};

module.exports = {
  generateToken,
};
