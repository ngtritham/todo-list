const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const taskModel = require('../models/taskModel');
const moment = require('moment');
const taskControllers = require('../controllers/taskControllers');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn('/auth/login');
const multer = require('multer');
const base64Img = require('base64-img');

//MULTER CONFIG: to get file photos to temp server storage
const multerConfig = {
    //specify diskStorage (another option is memory)
    storage: multer.diskStorage({

        //specify destination
        destination: function (req, file, next) {
            // console.log("req.body: ", req.body);
            // console.log("file: ", file);
            next(null, './public/media');
        },

        //specify the filename to be unique
        filename: function (req, file, next) {
            console.log(file);
            //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
            const ext = file.mimetype.split('/')[1];
            // console.log("EXT: ", ext);
            //set the file fieldname to a unique name containing the original name, current datetime and the extension.
            next(null, file.fieldname + '-' + Date.now() + '.' + ext);
        }
    }),

    // filter out and prevent non-image files.
    fileFilter: function (req, file, next) {
        if (!file) {
            next();
        }

        // only permit image mimetypes
        const image = file.mimetype.startsWith('image/');
        if (image) {
            console.log('photo uploaded');
            next(null, true);
        } else {
            console.log("file not supported")
            //TODO:  A better message response to user on failure.
            return next();
        }
    }
};


/* GET home page. */
router.get('/', taskControllers.getHome);

router.get('/tasks', taskControllers.getTasks);

router.post('/addTask', taskControllers.addTask);

router.post('/removeTask', taskControllers.removeTask);

router.post('/editTask', taskControllers.editTask);

router.get('/loadTask', taskControllers.loadTask);

router.post('/updateStatus', taskControllers.updateStatus);

// router.post('/uploadThumbnail', multer(multerConfig).single('photo'), function (req, res) {
//         console.log("/uploadThumbnail: ", req.body)
//         res.status(200);
//         res.redirect('/tasks');
//     }
// );

router.post('/uploadThumbnail', (req, res) => {
    //console.log("/uploadThumbnail: ", Object.keys(req.body)[0])
    const header = 'data:image/png;base64,';
    let base64Data = header + req.body.base64;
    const task_id = req.body.task_id
    base64Data = base64Data.replace(/ /g, '+');
    let desFolder = __dirname.split("\\");
    desFolder.pop();
    desFolder = desFolder.join("\\");
    desFolder += '\\public\\media\\' + task_id;

    // console.log(task_id);

    // console.log(base64Data);

    taskModel.updateThumbnail(task_id, base64Data)
        .then(result => {
            console.log("Update thumnail thành công !");
        })
        .catch(error => {
            console.log("Update thumnail thất bại !");
        });

    base64Img.img(base64Data, desFolder, task_id, function(err, filepath) {});
    res.status(200);
    res.end();
});

module.exports = router;
