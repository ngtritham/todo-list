const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const taskModel = require('../models/taskModel');
const moment = require('moment');
const taskControllers = require('../controllers/taskControllers');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn('/auth/login');

/* GET home page. */
router.get('/', taskControllers.getHome);

router.get('/tasks', taskControllers.getTasks);

router.post('/addTask', taskControllers.addTask);

router.post('/removeTask', taskControllers.removeTask);

router.post('/editTask', taskControllers.editTask);

router.get('/loadTask', taskControllers.loadTask);

router.post('/updateStatus', taskControllers.updateStatus);

module.exports = router;
