const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("사용자 인증에 실패하셨습니다.");
    }

    const decodedToken = jwt.verify(token, process.env.DB_JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("사용자 인증에 실패하셨습니다.", 403);
    return next(error);
  }
};
