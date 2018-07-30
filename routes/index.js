const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const taskModel = require('../models/taskModel');
const moment = require('moment');

/* GET home page. */
router.get('/', function (req, res, next) {
  taskModel.loadAll().then(rows => {
    res.render('_layout/index', {
      title: 'Todo List App',
      tasks: rows
    });
  });
});

router.post('/addTask', (req, res) => {
  let json = JSON.stringify(req.body);
  let content = req.body.content;
  let start = req.body.start_date;
  let end = req.body.end_date;
  //console.log(json);
  taskModel.add(null, content, start, end).then(values => {
    console.log(values);
  }).catch(error => {
    console.log(error);
  });
  res.redirect('/');
});

router.get('/showTask', (req, res) => {
  taskModel.loadAll().then(rows => {
    // console.log();

    for(let i = 0; i < rows.length; i++){
      rows[i].start_date = moment(rows[0].start_date).format('l');
      rows[i].end_date = moment(rows[0].end_date).format('l');
    }

    res.writeHead(200, {
      'Content-Type': 'text/json'
    });
    res.end(JSON.stringify(rows));
  });
});


module.exports = router;
