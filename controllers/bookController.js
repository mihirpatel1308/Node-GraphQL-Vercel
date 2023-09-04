// const Book = require('../models/Book');

// const catchAsync = require('../utils/catchAsync');

// exports.getAllBooks = catchAsync(async (req, res, next) => {
//   // Execute query
//   // console.log('res  : ' , res);
  
//   // const features = new APIFeatures(Book.find(), req.query)
//   // console.log('req.query : ' , req.query);
//   console.log('this is called');
//   const books = await Book.find();
//   res.status(200).json({
//     status: 'success',
//     results: books.length,
//     data: {
//       books,
//     },
//   });
// });

// exports.createBook = catchAsync(async (req, res, next) => {
//   // const newUser = await Book.create({
//   //   title: 'Book Two',
//   //   author: 'Angular One',
//   //   description: 'Demo one description'
//   // });
//   const newBook = await Book.create(req.body);
//   res.status(201).json({
//     status: 'Success',
//     data: {
//       books: newBook,
//     },
//   });
// });