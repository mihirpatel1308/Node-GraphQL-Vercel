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
          // id: {
          //   type: new GraphQLNonNull(GraphQLString),
          // },
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
      // updateBook: {
      //   type: taskLogType,
      //   args: {
      //     id: {
      //       name: "id",
      //       type: new GraphQLNonNull(GraphQLString),
      //     },
      //     isbn: {
      //       type: new GraphQLNonNull(GraphQLString),
      //     },
      //     title: {
      //       type: new GraphQLNonNull(GraphQLString),
      //     },
      //     author: {
      //       type: new GraphQLNonNull(GraphQLString),
      //     },
      //     description: {
      //       type: new GraphQLNonNull(GraphQLString),
      //     },
      //     published_year: {
      //       type: new GraphQLNonNull(GraphQLInt),
      //     },
      //     publisher: {
      //       type: new GraphQLNonNull(GraphQLString),
      //     },
      //   },
      //   resolve(root, params) {
      //     return TaskLogModel.findByIdAndUpdate(
      //       params.id,
      //       {
      //         isbn: params.isbn,
      //         title: params.title,
      //         author: params.author,
      //         description: params.description,
      //         published_year: params.published_year,
      //         publisher: params.publisher,
      //         updated_date: new Date(),
      //       },
      //       function (err) {
      //         if (err) return next(err);
      //       }
      //     );
      //   },
      // },
      // removeBook: {
      //   type: taskLogType,
      //   args: {
      //     id: {
      //       type: new GraphQLNonNull(GraphQLString),
      //     },
      //   },
      //   resolve(root, params) {
      //     const remBook = TaskLogModel.findByIdAndRemove(params.id).exec();
      //     if (!remBook) {
      //       throw new Error("Error");
      //     }
      //     return remBook;
      //   },
      // },
      // allBooks: {
      //   type: taskLogType,
      //   args: {
      //     id: {
      //       name: "id",
      //       type: new GraphQLNonNull(GraphQLString),
      //     },
      //     isbn: {
      //       type: new GraphQLNonNull(GraphQLString),
      //     },
      //     title: {
      //       type: new GraphQLNonNull(GraphQLString),
      //     },
      //     author: {
      //       type: new GraphQLNonNull(GraphQLString),
      //     },
      //     description: {
      //       type: new GraphQLNonNull(GraphQLString),
      //     },
      //     published_year: {
      //       type: new GraphQLNonNull(GraphQLInt),
      //     },
      //     publisher: {
      //       type: new GraphQLNonNull(GraphQLString),
      //     },
      //   },
      //   resolve(root, params) {
      //     return TaskLogModel.find(function (err) {
      //       if (err) return next(err);
      //     });
      //   },
      // },
    };
  },
});
module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
