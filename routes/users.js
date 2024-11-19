const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const passport = require("passport");
const users = require("../controllers/users");
const { isLoggedIn } = require("../middleware");
const multer = require("multer");

const upload = multer({ 
  dest: 'public/uploads/profiles',
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}`)
  }
});

router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

router.route("/profile")
.get(isLoggedIn, users.renderProfile)
.put(
  isLoggedIn, 
  upload.single('profileImage'), 
  users.updateProfile
);

router.get("/logout", users.logout);

module.exports = router;
