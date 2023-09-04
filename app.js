const dotenv = require("dotenv");
var express = require("express");
var graphqlHTTP = require("express-graphql").graphqlHTTP;
var bookSchema = require("./graphql/bookSchemas");
var taskLogSchema = require("./graphql/taskLogSchemas");
var taskLogHeaderSchema = require("./graphql/taskLogHeaderSchemas");
var cors = require("cors");
var createError = require("http-errors");
var indexRouter = require("./routes/index");
// var bookRouter = require("./routes/book");
var mongoose = require("mongoose");
const tourRouter = require("./routes/tourRoutes");
const checkJwt = require("./middleware/auth");

var app = express();

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
// const DB = 'mongodb+srv://mihirpatel:Admin123@cluster0.qrlmtn5.mongodb.net/WorkBookDemo?retryWrites=true&w=majority'
console.log("DB : ", DB);
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use(express.json());
app.use(
  "*",
  cors({
    origin: "*",
  })
);

// Define routes :
app.use("/", indexRouter);
// app.use("/books", bookRouter);
// app.use("/books", bookRouter);

app.use(
  "/graphql",
  checkJwt,
  cors({
    origin: "*",
  }),
  graphqlHTTP({
    schema: bookSchema,
    rootValue: global,
    graphiql: true,
  })
);

app.use(
  "/taskLog",
  checkJwt,
  cors({
    origin: "*",
  }),
  graphqlHTTP({
    schema: taskLogSchema,
    rootValue: global,
    graphiql: true,
  })
);

app.use(
  "/taskLogHeaders",
  checkJwt,
  cors({
    origin: "*",
  }),
  graphqlHTTP({
    schema: taskLogHeaderSchema,
    rootValue: global,
    graphql: true,
  })
);

app.use("/api/tours", tourRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler:
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log("error state  : ", err);
  res.json({
    error: {
      message: err.message,
      error: {},
    },
  });
  res.send(err);
  res.render("error");
});

module.exports = app;
