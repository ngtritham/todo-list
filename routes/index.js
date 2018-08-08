const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const taskModel = require('../models/taskModel');
const moment = require('moment');
const taskControllers = require('../controllers/taskControllers');

/* GET home page. */
router.get('/', taskControllers.getTasks);

router.post('/addTask', taskControllers.addTask);

router.post('/removeTask', taskControllers.removeTask);

router.post('/editTask', taskControllers.editTask);

router.get('/showTask', taskControllers.showTask);

router.post('/updateStatus', taskControllers.updateStatus);

module.exports = router;
