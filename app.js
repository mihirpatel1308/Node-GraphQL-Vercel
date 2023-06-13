const dotenv = require("dotenv");
var express = require("express");
var graphqlHTTP = require("express-graphql").graphqlHTTP;
var schema = require("./graphql/bookSchemas");
var cors = require("cors");
var createError = require("http-errors");
var indexRouter = require("./routes/index");
var bookRouter = require("./routes/book");
var mongoose = require("mongoose");

// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var app = express();

// dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );
// mongoose
//   // .connect(process.env.DATABASE_LOCAL,{
  //   .connect(DB, {
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false,
    //   })
    //   .then((con) => {
      //     // console.log(con.connections)
      //     console.log('DB connected successfully!!...');
      //   });
      
      const DB = 'mongodb+srv://mihirpatel:Admin123@cluster0.qrlmtn5.mongodb.net/WorkBookDemo?retryWrites=true&w=majority'
      console.log("DB : ", DB);
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(
//   cors({
//     origin: "*",
//   })
// );
app.use(
  "*",
  cors({
    origin: "*",
  })
);
app.use("/", indexRouter);
app.use("/books", bookRouter);
app.use(
  "/graphql",
  cors({
    origin: "*",
  }),
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true,
  })
);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/graphql`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log('error state  : ' , err);
  res.json({
    error: {
        message: err.message,
        error: {}
    }

});
  res.send(err);
  res.render("error");
});

module.exports = app;
