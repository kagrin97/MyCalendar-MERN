const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const usersRoutes = require("./routes/users-routes");
const calendarsRoutes = require("./routes/calendar-routes");
const HttpError = require("./models/http-error");

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/users", usersRoutes);
app.use("/api/calendar", calendarsRoutes);

app.use((req, res, next) => {
  const error = new HttpError("route를 찾을수 없습니다.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.error(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "알 수 없는 오류가 발생했습니다!" });
});

mongoose.set("strictQuery", false);

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h9y9y4t.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
