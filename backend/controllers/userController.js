const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const User = require("../models/userModel");

// @desc    Login a google account
// @route   /auth/google
// @access  Public
const googlelogin = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    userName = firstName + lastName;
    if (userExists) {
      res.status(200).json({
        _id: userExists._id,
        userName: userExists.userName,
        email: userExists.email,
        token: generateToken(userExists._id),
      });
    } else {
      // Create user
      const user = await User.create({
        userName,
        email,
        password,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          userName: user.userName,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new error("Invalid user data");
      }
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// @desc    Register a new user
// @route   /auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Validation
    if (!firstName || !lastName || !email || !password) {
      res.status(400);
      throw new Error("Please include all fields");
    }

    // Find if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(409);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      userName: firstName + lastName,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new error("Invalid user data");
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// @desc    Login a user
// @route   /auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check user and passwords match
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else if (!user) {
      res.status(400);
      throw new Error("Invalid email address");
    } else {
      res.status(401);
      throw new Error("Invalid password");
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Return a code in order to request token
// @route   /auth/github
// @access  Public
// Github login
const githubLogin = asyncHandler(async (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}&scope=read:user,user:email`
  );
});

// @desc    Request token in order to request user information
// @route   /oauth-callback
// @param   code
// @access  Public
const githubUserInfo = asyncHandler(async ({ query: { code } }, res) => {
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };
  const opts = { headers: { accept: "application/json" } };

  try {
    const responseToken = await axios.post(
      "https://github.com/login/oauth/access_token",
      body,
      opts
    );
    const token = responseToken.data.access_token;

    if (token) {
      const responseUser = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const resonseUserEmail = await axios.get(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );

      const userData = responseUser.data;
      const userEmailData = resonseUserEmail.data;

      // Find if user already exists
      const userExists = await User.findOne({ email: userEmailData[0].email });

      if (userExists) {
        return res.json({
          _id: userExists._id,
          userEmail: userExists.email,
          userName: userExists.userName,
          userExists: true,
          token: generateToken(userExists._id),
        });
      }

      console.log("Create new user");

      // Create new user
      const user = await User.create({
        userName: userData.login,
        email: userEmailData[0].email,
        password: "Github-Login-Password",
      });

      console.log("finshed create user");
      console.log(user);

      if (user) {
        return res.status(201).json({
          userId: user._id,
          userName: user.userName,
          userEmail: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    }
  } catch (error) {
    console.log("last:", error);
    res.json(error);
  }
});

const getUserByEmail = asyncHandler(async ({ query: { email } }, res) => {
  try {
    const user = await User.findOne({ email: email });
    return res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
    //throw new Error("User Not exist");
  }
});

module.exports = {
  registerUser,
  loginUser,
  githubLogin,
  githubUserInfo,
  getUserByEmail,
  googlelogin,
};
