const taskModel = require('../models/taskModel');
const moment = require('moment');


const TaskControllers = {
    getHome: (req, res) => {
        res.render('home/home', {
            isLogged: req.isAuthenticated()
        });
    },

    getTasks: (req, res) => {
        taskModel.loadAll().then(rows => {
            res.render('tasks/tasks', {
                tasks: rows,
                user: req.user,
                isLogged: req.isAuthenticated()
            });
        });
    },

    addTask: (req, res) => {
        let parent_id = 0;
        let content = req.body.content;
        let start_date = req.body.start_date;
        let end_date = req.body.end_date;
        let user_id = req.user.id;
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
        console.log(taskId);
        // taskModel.delete(taskId).then(result => {
        //     console.log("Xóa task id=" + taskId + " thành công !!!");
        // }).catch(error => {
        //     console.log("Lỗi không xóa được task id=" + taskId + "\nError:" + error);
        // });

        taskModel.updateStatus(taskId, status,status_log)
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
        res.redirect('/');
    },

    loadTask: (req, res) => {
        let user_id = req.user.id;
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
        console.log(`taskId ${taskId}`);
        let status = req.body.status;
        console.log(`status ${status}`);
        let status_log = req.body.status_log;
        taskModel.updateStatus(taskId, status, status_log).then(values => {
            console.log("Update status thành công");
        }).catch(error => {
            console.log("Update status thất bại");
        });
        res.end();
    }
}

module.exports = TaskControllers;