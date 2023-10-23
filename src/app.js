// app.js
const express = require("express");
const cors = require("cors");
const app = express();
const indexRouter = require("./routes/index");
const userRouter = require("./routes/userRoutes");
// other route imports...

app.use(express.json());
app.use(cors());
app.use("/", indexRouter);
app.use("/api", userRouter);
// other routes...

module.exports = app;
