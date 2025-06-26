const { Router } = require("express");
const passport = require("passport");
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage: storage });

const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.post("/sign-up", userController.createUser);

userRouter.post("/log-in", userController.logInUser);

userRouter.get(
  "/all-users",
  passport.authenticate("jwt", { session: false }),
  userController.getAllUsers
);

userRouter.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.getLoggedInUser
);

userRouter.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  userController.uploadProfilePicture
);

module.exports = userRouter;
