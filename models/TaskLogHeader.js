const { any } = require("bluebird");
var mongoose = require("mongoose");

var TaskLogHeaderSchema = new mongoose.Schema({
  id: String,
  columnName: String,
  columnTypeName: String,
  columnTypeId: Number,
  isEditable: Boolean,
  isHideInView: Boolean,
  isDeletable: Boolean,
  isSortingAvailable: Boolean,
  isSortingApply: Boolean,
  isFreezeUpToColumn: Boolean,
  isColumnWrap: Boolean,
  sortingProperty: Array,
  createdDate: String,
  updatedDate: String
});


module.exports = mongoose.model("TaskLogHeaders", TaskLogHeaderSchema);
