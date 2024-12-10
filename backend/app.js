// import the following packages:

const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

// Create a variable called `isProduction` that will be `true` if the environment
// is in production or not by checking the `environment` key in the configuration
// file (`backend/config/index.js`):
const { environment } = require('./config');
const isProduction = environment === 'production';

// connecting the exported router to `app`
const routes = require('./routes');

// Initialize the Express application:
const app = express();

// Connect the `morgan` middleware for logging information about requests and
// responses:
app.use(morgan('dev'));

// Add the `cookie-parser` middleware for parsing cookies and the `express.json`
// middleware for parsing JSON bodies of requests with `Content-Type` of
// `"application/json"`.
app.use(cookieParser());
app.use(express.json());

// security middleware

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }
  
  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );
  
  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

  app.use(routes); // Connect all the routes

  // error handling
  app.use((_req, _res, next) => { // req res re not used in this function
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    //err.errors = { message: "The requested resource couldn't be found." };
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
  });

  app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
      err.title = 'Validation error';
      err.errors = errors;
    }
    next(err);
  });

  // Error formatter

  app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack // error only if in production
    });
  });

  module.exports = app; 
