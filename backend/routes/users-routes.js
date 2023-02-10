const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post(
  "/signup",
  upload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 7 }),
  ],
  usersController.signup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 7 }),
  ],
  usersController.login
);

router.post(
  "/checkExistingEmail",
  [check("email").normalizeEmail().isEmail()],
  usersController.checkExistingEmail
);

module.exports = router;
