const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const blogRoute = require("./routes/blogRoute");
const authRoute = require("./routes/authRoutes");
const homeRoute = require("./routes/homeroute");
const create = require("./routes/create");
const { confirmUser, requireAuth } = require("./middlewares/requireAuth");
const sblog = require("./routes/singleBolgRoute");
const editRoute = require("./routes/editRoute");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.set("view engine", "ejs");

app.use("*", confirmUser);
app.get("/", homeRoute);
app.use("/sblog", sblog);
app.use("/blogs", blogRoute);
app.use(authRoute);
app.use("/", create);
app.use("/edit", editRoute);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT))
  .then(() => console.log("connection established"))
  .catch((err) => console.log(err));
