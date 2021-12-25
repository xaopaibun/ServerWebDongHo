var express = require("express");
const http = require("http");
var app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectDb = require("./src/config/connectDb");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const AuthenRouter = require("./src/routers/authen");
const ProductRouter = require("./src/routers/product");

require("dotenv").config();
require("./src/middleware/passport");
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
connectDb();
if (process.env.NODE_ENV !== "test") {
  //use morgan to log at command line
  app.use(morgan("combined")); //'combined' outputs the Apache style LOGs
}

app.use(cors());
app.use("/api/v1/auth", AuthenRouter);
app.use("/api/v1/product", ProductRouter);

app.get("/", (req, res) => res.send("Server Start Success"));


server.listen(process.env.PORT || 5000, () => {
  console.log("Server đang chay tren cong 5000");
});

module.exports = server; // for testing
