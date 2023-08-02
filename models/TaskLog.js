var mongoose = require("mongoose");

var TaskLogSchema = new mongoose.Schema({
  id: String,
  createdDate: { type: Date, default: Date.now },
  name: String,
  category: String,
  startDateTime: String,
  endDateTime: String,
  status: String,
  comments: String,
  hours: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TaskLog", TaskLogSchema);
