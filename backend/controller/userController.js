const User = require("../model/userModel");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const { get } = require("mongoose");

async function getUserController(req, res) {
  res.json({
    message: "User Controller is working",
  });
}

async function createUserController(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please provide all required fields: name, email, and password",
    });
  }
  const checkUser = await User.findOne({ email});
  if (checkUser) {
    return res.status(400).json({
      message: "User with given email already exists",
    });
  }
const encryptPassword = await bcrypt.hash(password, 10);

  const data = {
    name,
    email,
    password: encryptPassword,
  };

  const user = new User(data);
  await user.save();
  res.status(201).json({
    message: "User Created",
    user: user,
  });
}
async function loginHandleController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide both email and password",
    });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (comparePassword){
    const token = jwt.sign(
      {
        id : user._id,
        role : user.role,
      },
      process.env.AUTH_SECRET_KEY,
    );
    res.status(200).json({
      message: "Login successful", 
      accessToken: token, 
  });
}else {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }
}

async function getUserListController(req, res) {
  const userList= await User.find();

  res.status(200).json({
    meassage: "User List",
    users: userList,
  });
}

module.exports = {
  createUserController,
  getUserController,
  loginHandleController,
  getUserListController,
};