const taskModel = require('../models/taskModel');
const moment = require('moment');
const formidable = require('formidable');
const fs = require('fs');
const base64Img = require('base64-img');

const TaskControllers = {
    getHome: (req, res) => {
        let user = null;
        if (req.user) {
            user = req.user;
        } else if (req.session.user) {
            user = req.session.user;
        } else {
            // console.log("Không nhận được thông tin user /getHome");
        }
        const data = {
            user: user,
            isLogged: req.session.isLogged
        }
        res.render('home/home', {
            data: data
        });
    },

    getTasks: (req, res) => {
        let isLogged = null;
        if (req.user) {
            user = req.user;
            isLogged = true;
            // console.log("Có acc fb: ", user);
        } else if (req.session.user) {
            user = req.session.user;
            isLogged = true;
            // console.log("Có acc zalo: ", user);
        } else {
            console.log("Không nhận được thông tin user: getTask");
        }

        taskModel.loadAll()
            .then(rows => {
                console.log(user);
                const data = {
                    tasks: rows,
                    user: user,
                    isLogged: isLogged
                };

                res.render('tasks/tasks', {
                    data: data
                });
            })
            .catch(error => {
                console.log("Error getTasks taskControllers: ", error);
            });
    },

    addTask: (req, res) => {
        let parent_id = req.body.parent_id;
        let content = req.body.content;
        let start_date = req.body.start_date;
        let end_date = req.body.end_date;
        let user_id = null;
        if (req.user) {
            user_id = req.user.id;
        } else {
            user_id = req.session.user.id;
        }

        taskModel.add(parent_id, content, start_date, end_date, user_id).then(values => {
            console.log(values);
        }).catch(error => {
            console.log(error);
        });
        res.redirect('/tasks');
    },

    removeTask: (req, res) => {
        const taskId = req.body.taskId;
        const status = 2;
        const status_log = 'Deleted';

        taskModel.updateStatus(taskId, status, status_log)
            .then(result => {
                console.log("Xóa task id=" + taskId + " thành công !!!");
            })
            .catch(error => {
                console.log("Lỗi không xóa được task id=" + taskId + "\nError:" + error);
            });

        res.redirect('/tasks');
    },

    editTask: (req, res) => {
        let taskId = req.body.taskId;
        let content = req.body.content;
        let start_date = req.body.start_date;
        let end_date = req.body.end_date;
        taskModel.edit(taskId, content, start_date, end_date).then(values => {
            console.log(values);
        }).catch(error => {
            console.log(error);
        });
        res.redirect('/tasks');
    },

    loadTask: (req, res) => {
        let user_id = null;
        if (req.user) {
            user_id = req.user.id;
        } else {
            user_id = req.session.user.id;
        }
        taskModel.loadAllByUserId(user_id).then(rows => {
            for (let i = 0; i < rows.length; i++) {
                rows[i].start_date = moment(rows[i].start_date).format('l');
                rows[i].end_date = moment(rows[i].end_date).format('l');
            }
            res.writeHead(200, {
                'Content-Type': 'text/json'
            });
            res.end(JSON.stringify(rows));
        });
    },

    updateStatus: (req, res) => {
        let taskId = req.body.taskId;
        // console.log(`taskId ${taskId}`);
        let status = req.body.status;
        // console.log(`status ${status}`);
        let status_log = req.body.status_log;
        taskModel.updateStatus(taskId, status, status_log).then(values => {
            // console.log("Update status thành công");
        }).catch(error => {
            // console.log("Update status thất bại");
        });
        res.end();
    },

    uploadThumbnail: (req, res) => {
        try {
            const header = 'data:image/png;base64,';
            const task_id = req.body.task_id
            let base64Data = req.body.base64;
            let ext = base64Data.split(";")[0].split("/")[1];
            if(ext === 'jpeg'){
                ext = 'jpg';
            }
            console.log("Uploadthumnail: ", base64Data.split(";")[0].split("/")[1]);

            let desFolder = __dirname.split("\\");

            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            // base64Data = base64Data.replace(/ /g, '+');
            desFolder.pop();
            desFolder = desFolder.join('\\');
            desFolder += '\\public\\media\\thumbnails\\' + year + '\\' + month + '\\' + day + '\\' + task_id;

            const staticPath = 'media/thumbnails/' + year + '/' + month + '/' + day + '/' + task_id + '/' + task_id + '.' + ext;

            console.log("desFolder: ", desFolder);
            console.log("staticPath: ", staticPath);
            // taskModel.updateThumbnail(task_id, base64Data)
            //     .then(result => {
            //         console.log("Update thumnail thành công !");
            //     })
            //     .catch(error => {
            //         console.log("Update thumnail thất bại !");
            //     });

            taskModel.updateThumbnailURL(task_id, staticPath)
                .then(result => {
                    console.log("Update thumnail URL thành công !");
                })
                .catch(error => {
                    console.log("Update thumnail thất bại !");
                    console.error(error);
                });

            base64Img.img(base64Data, desFolder, task_id, function (err, filepath) {});
            res.status(200);
            res.redirect('/tasks');
        } catch (error) {
            console.error()
        }

    }
}

module.exports = TaskControllers;