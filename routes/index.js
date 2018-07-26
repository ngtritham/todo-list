var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('_layout/index', {
    title: 'Express'
  });
});

router.post('/addTask', urlencodedParser, (req, res) => {
  console.log(req.body.content);

  res.send("Thêm task thành công !!");
});


module.exports = router;
