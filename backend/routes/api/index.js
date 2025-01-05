// Connect all the routers exported from these two files in the `index.js` file
// nested in the `backend/routes/api` folder. Make sure to connect the routers
// AFTER the `restoreUser` middleware is connected.

// Your `backend/routes/api/index.js` file should now look like this:

const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const { restoreUser } = require("../../utils/auth.js");


// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null

  router.use(restoreUser);

  router.use('/session', sessionRouter); // this router is set for log in
  
  router.use('/users', usersRouter);     // this router is set for sign up, creating a new user

  router.use('/spots', spotsRouter);
  
  router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
  });

  module.exports = router;