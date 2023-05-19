const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const routes = require("./routes");
const {authentication} = require("./middlewares/authenticationMiddleware");
const app = express();
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
  })
);

app.set("view engine", "hbs");

app.use("/static", express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authentication);
app.use(routes);
//data base change the name
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/exam");

app.listen(4000, () => console.log("server is runnig on port 4000...."));
