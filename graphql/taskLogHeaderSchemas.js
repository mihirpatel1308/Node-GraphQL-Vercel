var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
const { GraphQLBoolean } = require("graphql");
// var TaskLogModel = require("../models/TaskLog");
var TaskLogHeadersModel = require("../models/TaskLogHeader");

// Define the GraphQL object types with names
const SortingPropertyType = new GraphQLObjectType({
  name: "sortingProperty", // Name is specified here
  fields: {
    sortingId: { type: GraphQLInt },
    sortingName: { type: GraphQLString },
  },
});

var taskLogHeadersType = new GraphQLObjectType({
  name: "taskLogHeader",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      columnName: {
        type: GraphQLString,
      },
      columnType: {
        type: GraphQLString,
      },
      isEditable: {
        type: GraphQLBoolean,
      },
      isHideInView: {
        type: GraphQLBoolean,
      },
      isDeletable: {
        type: GraphQLBoolean,
      },
      isSortingAvailable: {
        type: GraphQLBoolean,
      },
      isFreezeUpToColumn: {
        type: GraphQLBoolean,
      },
      isColumnWrap: {
        type: GraphQLBoolean,
      },
      sortingProperty: { type: GraphQLList(SortingPropertyType) },
    };
  },
});

var queryType = new GraphQLObjectType({
  name: "QueryForHeader",
  fields: function () {
    return {
      taskLogHeaders: {
        type: new GraphQLList(taskLogHeadersType),
        resolve: function () {
          const taskLogHeaders = TaskLogHeadersModel.find().exec();
          if (!taskLogHeaders) {
            throw new Error("Error");
          }
          return taskLogHeaders;
        },
      },
    };
  },
});

module.exports = new GraphQLSchema({ query: queryType });

const {
  GraphQLInputObjectType,
  // GraphQLInt,
  // GraphQLString,
} = require("graphql");

const SortingPropertyInputType = new GraphQLInputObjectType({
  name: "SortingPropertyInput",
  fields: {
    sortingId: { type: GraphQLInt },
    sortingName: { type: GraphQLString },
  },
});

var mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      addTaskLogHeader: {
        type: taskLogHeadersType,
        args: {
          columnName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          columnType: {
            type: new GraphQLNonNull(GraphQLString),
          },
          isEditable: {
            type: new GraphQLNonNull(GraphQLBoolean),
          },
          isHideInView: {
            type: new GraphQLNonNull(GraphQLBoolean),
          },
          isDeletable: {
            type: new GraphQLNonNull(GraphQLBoolean),
          },
          isSortingAvailable: {
            type: new GraphQLNonNull(GraphQLBoolean),
          },
          isFreezeUpToColumn: {
            type: new GraphQLNonNull(GraphQLBoolean),
          },
          isColumnWrap: {
            type: new GraphQLNonNull(GraphQLBoolean),
          },
          sortingProperty: {
            type: new GraphQLNonNull(
              GraphQLList(SortingPropertyInputType) // Use the Input Type here
            ),
          },
        },
        resolve: function (root, params) {
          const taskLogHeaderModelData = new TaskLogHeadersModel(params);
          const newTaskLogHeader = taskLogHeaderModelData.save();
          if (!newTaskLogHeader) {
            throw new Error("Error");
          }
          return newTaskLogHeader;
        },
      },
    };
  },
});
module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
