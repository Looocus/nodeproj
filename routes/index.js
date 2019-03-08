const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.status(200);
	res.render('index' , {
    status: 200
  });
});

router.get('/mailtest', function (req, res) {
  res.render('mail');
})


module.exports = router;
