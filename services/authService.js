const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jsonwebtoken");
const {SICRET} = require("../constants");

exports.findByUsername = (username) => User.findOne({username});

exports.findByEmail = (email) => User.findOne({email});

exports.register = async (username, email, password, repeatPassword) => {
  //validate password

  if (password !== repeatPassword) {
    throw new Error("Password missmatch");
  }

  if (password.length < 4) {
    throw new Error("Passowrd must be at least four character");
  }

  const existingUser = await User.findOne({$or: [{email}, {username}]});


  if (existingUser) {
    throw new Error("User exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({username, email, password: hashedPassword});
  return this.login(email, password);

};

exports.login = async (email, password) => {
 
  const user = await this.findByEmail(email);
  if (!user) {
    throw new Error("Invalid Email or Password");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid Email or Password");
  }

  //generate token
  const payload = {
    _id: user._id,
    username: user.username,
  };
  const token = await jwt.sign(payload, SICRET);
  return token;
};
