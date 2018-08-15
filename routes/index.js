const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const taskModel = require('../models/taskModel');
const moment = require('moment');
const taskControllers = require('../controllers/taskControllers');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn('/auth/login');
const handleLayout_MW = require('../middlewares/handleLayout');

/* GET home page. */
router.get('/', taskControllers.getHome);

router.get('/tasks', handleLayout_MW, taskControllers.getTasks);

router.post('/addTask', handleLayout_MW, taskControllers.addTask);

router.post('/removeTask', handleLayout_MW, taskControllers.removeTask);

router.post('/editTask', handleLayout_MW, taskControllers.editTask);

router.get('/loadTask', handleLayout_MW, taskControllers.loadTask);

router.post('/updateStatus', handleLayout_MW, taskControllers.updateStatus);

router.post('/uploadThumbnail', handleLayout_MW, taskControllers.uploadThumbnail);

module.exports = router;
