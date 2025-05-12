const { Router } = require("express");
const passport = require("passport");

const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.post("/sign-up", userController.createUser);

userRouter.post("/log-in", userController.logInUser);

userRouter.get(
  "/all-users",
  passport.authenticate("jwt", { session: false }),
  userController.getAllUsers
);

module.exports = userRouter;
