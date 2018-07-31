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
  let parent_id = req.body.parent_id;
  let content = req.body.content;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  taskModel.add(parent_id, content, start_date, end_date).then(values => {
    console.log(values);
  }).catch(error => {
    console.log(error);
  });
  res.redirect('/');
});

router.post('/removeTask', (req, res) => {
  taskId = req.body.taskId;
  console.log(taskId);
  taskModel.delete(taskId).then(result => {
    console.log("Xóa task id=" + taskId + " thành công !!!");
  }).catch(error => {
    console.log("Lỗi không xóa được task id=" + taskId + "\nError:" + error);
  });

  res.redirect('/');
});

router.post('/editTask', (req, res) => {
  let taskId = req.body.taskId;
  let content = req.body.content;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  taskModel.edit(taskId, content, start_date, end_date).then(values => {
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
