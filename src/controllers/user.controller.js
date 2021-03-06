const userModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const passport = require("passport");
const Util = require("../config/index");

const authenFacebook = (req, res, next) =>
  passport.authenticate("facebook-token", async function (error, user, info) {
    if (error) return res.serverError(error);
    if (info) return res.unauthorized(info);
    let accessToken = await Util.GenerateToken({ _id: user._id }, "3600s");
    return res.send({ accessToken, success: true, message: "Login Success" });
  })(req, res);

const authenGoogle = (req, res, next) =>
  passport.authenticate(
    "google-plus-token",
    async function (error, user, info) {
      if (error) return res.serverError(error);
      if (info) return res.unauthorized(info);
      let accessToken = await Util.GenerateToken({ _id: user._id }, "3600s");
      return res.send({ accessToken, success: true, message: "Login Success" });
    }
  )(req, res);

const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Missing username or/and password" });
    }
    const user = await userModel.CheckAdmin(username);
    if (user) {
      if ((await bcryptjs.compare(password, user.password)) === true) {
        let accessToken = await Util.GenerateToken({ _id: user._id }, "3600s");
        res.setHeader("AccessToken", accessToken);
        res.status(200).send({
          success: true,
          message: "Login Admin, Success",
          accessToken,
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Dang nhap that bai do sai tai khoan",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Dang nhap that bai do sai tai khoan",
      });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: "Login Error" });
  }
};
const signup = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ success: false, message: "Missing username or/and password" });
  }
  try {
    if (await userModel.findByUsername(username)) {
      res.status(400).send({ success: false, message: "Username da ton tai" });
    } else {
      const hashPassword = await bcrypt.hash(password, saltRounds);
      await userModel.createNew({ username: username, password: hashPassword });
      res.status(400).send({ success: true, message: "Signup Success" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: "error" });
  }
};

module.exports = {
  loginAdmin,
  signup,
  authenGoogle,
  authenFacebook,
};
