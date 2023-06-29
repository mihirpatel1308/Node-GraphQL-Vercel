const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: false,
      trim: true,
      // maxLength: [40, 'A tour name must have less or equal then 40 character'],
      // minLength: [10, 'A tour name must have more or equal then 10 character'],
      // validate: [validator.isAlpha, 'Tour name must only contain characters.']
    },
    slug: String,
    duration: {
      type: Number,
      required: [false, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [false, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [false, 'A tour must have a difficulty'],
      enum: ['easy', 'medium', 'difficult'],
      message: 'Difficult is either : easy, medium, difficult',
    },
  //   ratingsAverage: {
  //     type: Number,
  //     default: 4.5,
  //     min: [1, 'Rating must be above 1.0'],
  //     max: [5, 'Rating must be below 5.0'],
  //   },
  //   ratingsQuantity: {
  //     type: Number,
  //     default: 0,
  //   },
  //   price: {
  //     type: Number,
  //     required: [false, 'A tour must have a price'],
  //   },
  //   priceDiscount: {
  //     type: Number,
  //     validate: {
  //       validator: function (val) {
  //         // For current doc or new doc
  //         return val < this.price;
  //       },
  //       message: 'Discount price({VALUE}) should be below regular price.',
  //     },
  //   },
  //   summary: {
  //     type: String,
  //     trim: true,
  //   },
  //   description: {
  //     type: String,
  //     trim: true,
  //   },
  //   imageCover: {
  //     type: String,
  //     required: [false, 'A tour must have a cover image'],
  //   },
  //   images: [String],
  //   createdAt: {
  //     type: Date,
  //     default: Date.now(),
  //     select: false,
  //   },
  //   startDates: [Date],
  //   secretTour: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// -----------------------------------------------------------------------------------
// Document middleware : runs before .save() and .create
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function (next) {
//   console.log('save documents......');
//   next();
// })

// tourSchema.post('save', function (doc,next) {
//   console.log(doc);
//   next();
// })
// ------------------------------------------------------------------
// Query Middleware :

// tourSchema.pre('find',function (next) {
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  // this.find({secretTour: {$ne: true}})
  console.log(`query took ${Date.now() - this.start} milliseconds!!`);
  // console.log(docs);
  next();
});

// ----------------------------------------------------------------
// Aggregation Middleware :

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
