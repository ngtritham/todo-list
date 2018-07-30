var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const taskModel = require('../models/taskModel');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

/* GET home page. */
router.get('/', function (req, res, next) {
  taskModel.loadAll().then(rows => {
    res.render('_layout/index', {
      title: 'Todo List App',
      tasks: rows
    });
  });
  
});

router.post('/addTask', urlencodedParser, (req, res) => {
  console.log(req.body.content);

  //res.send("Thêm task thành công !!");
});

router.get('/showTask', (req, res) => {
  taskModel.loadAll().then(rows => {
    //console.log(rows);
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end(JSON.stringify(rows));
  });
});


module.exports = router;
