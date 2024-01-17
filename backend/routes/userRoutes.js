const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  githubUserInfo,
  githubLogin,
  getUserByEmail,
  googlelogin,
} = require("../controllers/userController");

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/google", googlelogin);
router.get("/auth/github", githubLogin);
router.get("/oauth-callback", githubUserInfo);
router.get("/search/userEmail", getUserByEmail);

module.exports = router;
