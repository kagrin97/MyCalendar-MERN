const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  createdDate: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

calendarSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Calendar", calendarSchema);
