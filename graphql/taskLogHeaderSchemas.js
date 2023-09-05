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
    isApply: { type: GraphQLBoolean },
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
      columnTypeName: {
        type: GraphQLString,
      },
      columnTypeId: {
        type: GraphQLInt,
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
      isSortingApply: {
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
      createdDate: {
        type: GraphQLString,
      },
      updatedDate: {
        type: GraphQLString,
      },
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
    isApply: { type: GraphQLBoolean },
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
          columnTypeName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          columnTypeId: {
            type: new GraphQLNonNull(GraphQLInt),
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
          // createdDate: {
          //   type: new GraphQLNonNull(GraphQLString),
          // },
          // sortingProperty: {
          //   type: new GraphQLNonNull(
          //     GraphQLList(SortingPropertyInputType) // Use the Input Type here
          //   ),
          // },
        },
        resolve: function (root, params) {
          params.sortingProperty = [
            {
              sortingId: 1,
              sortingName: "Sort ascending",
              isApply: false,
            },
            {
              sortingId: 2,
              sortingName: "Sort descending",
              isApply: false,
            },
          ];
          params.isSortingApply = false;
          params.createdDate = new Date();
          params.updatedDate = new Date();
          const taskLogHeaderModelData = new TaskLogHeadersModel(params);
          const newTaskLogHeader = taskLogHeaderModelData.save();
          if (!newTaskLogHeader) {
            throw new Error("Error");
          }
          return newTaskLogHeader;
        },
      },
      updateTaskLogHeader: {
        type: taskLogHeadersType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
          },
          columnName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          columnTypeName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          columnTypeId: {
            type: new GraphQLNonNull(GraphQLInt),
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
          isSortingApply: {
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
        async resolve(root, params) {
          try {
            const updatedTaskLogHeader =
              await TaskLogHeadersModel.findByIdAndUpdate(
                params.id,
                {
                  columnName: params.columnName,
                  columnTypeName: params.columnTypeName,
                  columnTypeId: params.columnTypeId,
                  isEditable: params.isEditable,
                  isHideInView: params.isHideInView,
                  isDeletable: params.isDeletable,
                  isSortingAvailable: params.isSortingAvailable,
                  isSortingApply: params.isSortingApply,
                  isFreezeUpToColumn: params.isFreezeUpToColumn,
                  isColumnWrap: params.isColumnWrap,
                  sortingProperty: params.sortingProperty,
                  updated_date: new Date(),
                },
                { new: true } // To return the updated document
              ).exec();

            if (!updatedTaskLogHeader) {
              throw new Error("Task Log header not found");
            }

            return updatedTaskLogHeader;
          } catch (err) {
            throw new Error(err.message);
          }
        },
      },
      // removeTaskLog: {
      //   type: taskLogHeadersType,
      //   args: {
      //     id: {
      //       type: new GraphQLNonNull(GraphQLString),
      //     },
      //   },
      //   async resolve(root, params) {
      //     console.log("params : ", params);
      //     try {
      //       const removedTaskLog = await TaskLogModel.findByIdAndRemove(
      //         params.id
      //       ).exec();
      //       if (!removedTaskLog) {
      //         throw new Error("Task Log not found");
      //       }
      //       return removedTaskLog;
      //     } catch (err) {
      //       throw new Error(err.message);
      //     }
      //   },
      // },
    };
  },
});
module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
