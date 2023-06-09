// const AppError = require('../utils/appError');
const Book = require('./../models/Book');

const APIFeatures = require('./../utils/apiFeatures');

const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // Execute query
  // console.log('res  : ' , res);
  
  // const features = new APIFeatures(Book.find(), req.query)
  // console.log('req.query : ' , req.query);
  const users = await Book.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  // const newUser = await Book.create({
  //   title: 'Book Two',
  //   author: 'Angular One',
  //   description: 'Demo one description'
  // });
  const newUser = await Book.create(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      users: newUser,
    },
  });
});