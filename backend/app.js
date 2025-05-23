const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const userRouter = require("./routes/userRouter");
const messagesRouter = require("./routes/messageRouter");
const chatroomRouter = require("./routes/chatroomRouter");

const app = express();
require("./config/passport");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET, PUT, POST, DELETE",
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);
app.use("/messages", messagesRouter);
app.use("/chatroom", chatroomRouter);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on the ${process.env.PORT}`);
});
