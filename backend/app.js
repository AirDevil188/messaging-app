const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const indexRouter = require("./routes/indexRouter");

const app = express();

app.use(
  cors({
    origin: ["http://192.168.1.99:5173"],
    methods: "GET, PUT, POST, DELETE",
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on the ${process.env.PORT}`);
});
