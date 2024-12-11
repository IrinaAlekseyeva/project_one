const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);
// A router is created and an API test route is added to the router. The API test
// route is accepting requests with the URL path of `/api/test` with the HTTP verb
// of `POST`. It sends a JSON response containing whatever is in the body of the
// request.
// **Make sure to keep the `restoreUser` middleware connected before any other
// middleware or route handlers are connected to the router.**This will allow
// all route handlers connected to this router to retrieve the current user on the
// Request object as `req.user`. If there is a valid current user session, then
// `req.user` will be set to the `User` in the database. If there is NO valid
// current user session, then `req.user` will be set to `null`.
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });

// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

//GET /api/restore-user


router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

module.exports = router;