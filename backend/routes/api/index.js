const router = require('express').Router();

// A router is created and an API test route is added to the router. The API test
// route is accepting requests with the URL path of `/api/test` with the HTTP verb
// of `POST`. It sends a JSON response containing whatever is in the body of the
// request.
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });


module.exports = router;