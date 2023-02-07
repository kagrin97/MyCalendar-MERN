const express = require("express");
const { check } = require("express-validator");

const calendarControllers = require("../controllers/calendar-controllers");
const checkAuth = require("../middleware/check-auth");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/:cid", calendarControllers.getCalendarById);

router.get("/user/:uid", calendarControllers.getCalendarsByUserId);

router.use(checkAuth);

router.post(
  "/uploadImg",
  fileUpload.single("image"),
  calendarControllers.uploadImgCalendar
);

router.post(
  "/",
  [
    check("title").isLength({ min: 1 }),
    check("description").isLength({ min: 1 }),
    check("userId").not().isEmpty(),
  ],
  calendarControllers.createCalendar
);

router.patch(
  "/:cid",
  check("title").isLength({ min: 1 }),
  check("description").isLength({ min: 1 }),
  calendarControllers.updateCalendar
);

router.delete("/:cid", calendarControllers.deleteCalendar);

module.exports = router;
