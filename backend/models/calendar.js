const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  date: { type: String, required: true },
  drugList: [{ type: String, required: true }],
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

calendarSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Calendar", calendarSchema);
