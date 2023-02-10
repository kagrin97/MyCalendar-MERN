const fs = require("fs");

const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Calendar = require("../models/calendar");
const User = require("../models/user");

const ERROR = require("../constants/error");

const getCalendarById = async (req, res, next) => {
  const calendarId = req.params.cid;

  let calendar;
  try {
    calendar = await Calendar.findById(calendarId);
  } catch (err) {
    const error = new HttpError(ERROR.CALENDAR.SERVER, 500);
    return next(error);
  }

  if (!calendar) {
    const error = new HttpError(ERROR.CALENDAR.CID, 404);
    return next(error);
  }

  res.json({ calendar: calendar.toObject({ getters: true }) });
};

const getCalendarsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithCalendars;
  try {
    userWithCalendars = await User.findById(userId).populate("calendars");
  } catch (err) {
    const error = new HttpError(ERROR.CALENDAR.SERVER, 500);
    return next(error);
  }

  if (!userWithCalendars || userWithCalendars.calendars.length === 0) {
    return next(new HttpError(ERROR.CALENDAR.UID, 404));
  }

  res.json({
    calendar: userWithCalendars.calendars.map((calendar) =>
      calendar.toObject({ getters: true })
    ),
  });
};

const createCalendar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError(ERROR.CALENDAR.INPUT, 422));
  }

  const { title, description, userId, createdDate } = req.body;

  const createdCalendar = new Calendar({
    title,
    description,
    createdDate,
    creator: userId,
  });

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(ERROR.CALENDAR.SERVER, 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError(ERROR.USER.UID, 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdCalendar.save({ session: sess });
    user.calendars.push(createdCalendar);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(ERROR.CALENDAR.SERVER, 500);
    return next(error);
  }

  res.status(201).json({ calendar: createdCalendar });
};

const updateCalendar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError(ERROR.CALENDAR.INPUT, 422));
  }

  const { title, description } = req.body;
  const calendarId = req.params.cid;

  let calendar;
  try {
    calendar = await Calendar.findById(calendarId);
  } catch (err) {
    const error = new HttpError(ERROR.CALENDAR.SERVER, 500);
    return next(error);
  }

  if (calendar.creator.toString() !== req.userData.userId) {
    const error = new HttpError(ERROR.USER.AUTH, 401);
    return next(error);
  }

  calendar.title = title;
  calendar.description = description;

  try {
    await calendar.save();
  } catch (err) {
    const error = new HttpError(ERROR.CALENDAR.SERVER, 500);
    return next(error);
  }

  res.status(200).json({ calendar: calendar.toObject({ getters: true }) });
};

const deleteCalendar = async (req, res, next) => {
  const calendarId = req.params.cid;

  let calendar;
  try {
    calendar = await Calendar.findById(calendarId).populate("creator");
  } catch (err) {
    const error = new HttpError(ERROR.CALENDAR.SERVER, 500);
    return next(error);
  }

  if (!calendar) {
    const error = new HttpError(ERROR.CALENDAR.CID, 404);
    return next(error);
  }

  if (calendar.creator.id !== req.userData.userId) {
    const error = new HttpError(ERROR.USER.AUTH, 401);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await calendar.remove({ session: sess });
    calendar.creator.calendars.pull(calendar);
    await calendar.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(ERROR.CALENDAR.SERVER, 500);
    return next(error);
  }

  res.status(200).json({ message: "캘린더 삭제 완료." });
};

const cloudinary = require("cloudinary").v2;

const uploadImgCalendar = (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  cloudinary.uploader.upload(
    req.file.path,
    { resource_type: "image", width: 300, height: 300, crop: "limit" },
    (err, result) => {
      if (err) {
        const error = new HttpError(err.message, 400);
        return next(error);
      }
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error(err);
        }
        res
          .status(200)
          .json({ message: "Image 업로드 ", imgURL: result.secure_url });
      });
    }
  );
};

exports.getCalendarById = getCalendarById;
exports.getCalendarsByUserId = getCalendarsByUserId;
exports.createCalendar = createCalendar;
exports.updateCalendar = updateCalendar;
exports.deleteCalendar = deleteCalendar;
exports.uploadImgCalendar = uploadImgCalendar;
