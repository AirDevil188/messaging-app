const { Router } = require("express");

const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.post("/sign-up", userController.createUser);

userRouter.post("/log-in", userController.logInUser);

module.exports = userRouter;
