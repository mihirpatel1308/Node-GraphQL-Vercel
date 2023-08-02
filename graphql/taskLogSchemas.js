var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
// var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
// var GraphQLDate = require("graphql-date");
var TaskLogModel = require("../models/TaskLog");

var taskLogType = new GraphQLObjectType({
  name: "taskLog",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      createdDate: {
        type: GraphQLString,
      },
      name: {
        type: GraphQLString,
      },
      category: {
        type: GraphQLString,
      },
      startDateTime: {
        type: GraphQLString,
      },
      endDateTime: {
        type: GraphQLString,
      },
      status: {
        type: GraphQLString,
      },
      comments: {
        type: GraphQLString,
      },
      hours: {
        type: GraphQLString,
      },
      updated_date: {
        type: GraphQLString,
      },
    };
  },
});

var queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      taskLogs: {
        type: new GraphQLList(taskLogType),
        resolve: function () {
          const taskLogs = TaskLogModel.find().exec();
          if (!taskLogs) {
            throw new Error("Error");
          }
          return taskLogs;
        },
      },
      taskLog: {
        type: taskLogType,
        args: {
          id: {
            name: "_id",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const taskLogDetails = TaskLogModel.findById(params.id).exec();
          if (!taskLogDetails) {
            throw new Error("Error");
          }
          return taskLogDetails;
        },
      },
    };
  },
});

module.exports = new GraphQLSchema({ query: queryType });
var mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      addTaskLog: {
        type: taskLogType,
        args: {
          createdDate: {
            type: new GraphQLNonNull(GraphQLString),
          },
          name: {
            type: new GraphQLNonNull(GraphQLString),
          },
          category: {
            type: new GraphQLNonNull(GraphQLString),
          },
          startDateTime: {
            type: new GraphQLNonNull(GraphQLString),
          },
          endDateTime: {
            type: new GraphQLNonNull(GraphQLString),
          },
          status: {
            type: new GraphQLNonNull(GraphQLString),
          },
          comments: {
            type: new GraphQLNonNull(GraphQLString),
          },
          hours: {
            type: new GraphQLNonNull(GraphQLString),
          },
          updated_date: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: function (root, params) {
          const taskLogModelData = new TaskLogModel(params);
          const newTaskLog = taskLogModelData.save();
          if (!newTaskLog) {
            throw new Error("Error");
          }
          return newTaskLog;
        },
      },
      updateTaskLog: {
        type: taskLogType,
        args: {
          id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLString),
          },
          createdDate: {
            type: new GraphQLNonNull(GraphQLString),
          },
          name: {
            type: new GraphQLNonNull(GraphQLString),
          },
          category: {
            type: new GraphQLNonNull(GraphQLString),
          },
          startDateTime: {
            type: new GraphQLNonNull(GraphQLString),
          },
          endDateTime: {
            type: new GraphQLNonNull(GraphQLString),
          },
          status: {
            type: new GraphQLNonNull(GraphQLString),
          },
          comments: {
            type: new GraphQLNonNull(GraphQLString),
          },
          hours: {
            type: new GraphQLNonNull(GraphQLString),
          },
          updated_date: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        async resolve(root, params) {
         
          try {
            const updatedTaskLog = await TaskLogModel.findByIdAndUpdate(
              params.id,
              {
                createdDate: params.createdDate,
                name: params.name,
                category: params.category,
                startDateTime: params.startDateTime,
                endDateTime: params.endDateTime,
                status: params.status,
                comments: params.comments,
                hours: params.hours,
                updated_date: new Date(),
              },
              { new: true } // To return the updated document
            ).exec();

            if (!updatedTaskLog) {
              throw new Error("Task Log not found");
            }

            return updatedTaskLog;
          } catch (err) {
            throw new Error(err.message);
          }
        },
      },
      removeTaskLog: {
        type: taskLogType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        async resolve(root, params) {
          console.log("params : ", params);
          try {
            const removedTaskLog = await TaskLogModel.findByIdAndRemove(
              params.id
            ).exec();
            if (!removedTaskLog) {
              throw new Error("Task Log not found");
            }
            return removedTaskLog;
          } catch (err) {
            throw new Error(err.message);
          }
        },
      },
    };
  },
});
module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
