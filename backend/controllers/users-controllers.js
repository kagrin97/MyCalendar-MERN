const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const ERROR = require("../constants/error");

const checkExistingEmail = async (req, res, next) => {
  const { email } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(ERROR.USER.SERVER, 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(ERROR.USER.EXIST, 422);
    return next(error);
  }

  res.status(200).json({});
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError(ERROR.USER.INPUT, 422));
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(ERROR.USER.SERVER, 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(ERROR.USER.EXIST, 422);
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(ERROR.USER.SERVER, 500);
    return next(error);
  }

  const cloudinary = require("cloudinary").v2;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const cloudinaryImageUpload = (size) => {
    if (!req.file) {
      return;
    }
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        req.file.path,
        { resource_type: "image", width: size, height: size, crop: "limit" },
        (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error(err);
              reject(err);
            }

            resolve(result.secure_url);
          });
        }
      );
    });
  };

  const [imgURL] = await Promise.all([cloudinaryImageUpload("100")]);

  const createdUser = new User({
    name,
    email,
    image:
      imgURL ||
      "https://res.cloudinary.com/dwtcxchod/image/upload/v1676009191/default-Avatar_olyg4b.png",
    password: hashedPassword,
    calendars: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(ERROR.USER.SERVER, 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.DB_JWT_KEY,
      { expiresIn: "12h" }
    );
  } catch (err) {
    const error = new HttpError(ERROR.USER.SERVER, 500);
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    token,
    name,
    avatar: createdUser.image,
  });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError(ERROR.USER.INPUT, 422));
  }
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(ERROR.USER.SERVER, 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(ERROR.USER.WRONG, 422);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(ERROR.USER.SERVER, 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(ERROR.USER.WRONG, 403);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.DB_JWT_KEY,
      { expiresIn: "12h" }
    );
  } catch (err) {
    const error = new HttpError(ERROR.USER.SERVER, 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token,
    name: existingUser.name,
    avatar: existingUser.image,
  });
};

exports.signup = signup;
exports.login = login;
exports.checkExistingEmail = checkExistingEmail;
