const { any } = require("bluebird");
var mongoose = require("mongoose");

var TaskLogHeaderSchema = new mongoose.Schema({
  id: String,
  columnName: String,
  columnType: String,
  isEditable: Boolean,
  isHideInView: Boolean,
  isDeletable: Boolean,
  isSortingAvailable: Boolean,
  isFreezeUpToColumn: Boolean,
  isColumnWrap: Boolean,
  sortingProperty: Array
});


module.exports = mongoose.model("TaskLogHeaders", TaskLogHeaderSchema);
