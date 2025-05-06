const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const db = require("../db/queries");
const passport = require("passport");
const generateToken = require("../config/jwt");

const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must contain at least 3 characters."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters."),
  body("confirm_password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Password must match."),
];

const createUser = [
  validateUser,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json([errors]);
    }
    const { username, password } = req.body;
    const existingUser = await db.findUser(username);
    if (existingUser) {
      return res.status(422).json({ message: "User already exists!" });
    }
    bcryptjs.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return err;
      }

      const user = await db.createUser(username, hashedPassword);

      return res.json(user);
    });
  }),
];

const logInUser = asyncHandler(async (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    async (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({
          message: "User not found.",
        });
      }
      req.login(user, { session: false });
      req.user = user;
      const token = await generateToken.generateToken(req.user);
      return res.json(token);
    }
  )(req, res, next);
});

module.exports = {
  logInUser,
  createUser,
};
