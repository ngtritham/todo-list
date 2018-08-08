const taskModel = require('../models/taskModel');
const moment = require('moment');

const TaskControllers = {
    getTasks: (req, res, next) => {
        taskModel.loadAll().then(rows => {
            res.render('tasks/tasks', {
                title: 'Todo List App',
                tasks: rows
            });
        });
    },

    addTask: (req, res) => {
        let parent_id = 0;
        let content = req.body.content;
        let start_date = req.body.start_date;
        let end_date = req.body.end_date;
        let user_id = 1;
        console.log("Parent ID = " + parent_id);
        taskModel.add(parent_id, content, start_date, end_date, user_id).then(values => {
            console.log(values);
        }).catch(error => {
            console.log(error);
        });
        res.redirect('/');
    },

    removeTask: (req, res) => {
        taskId = req.body.taskId;
        console.log(taskId);
        taskModel.delete(taskId).then(result => {
            console.log("Xóa task id=" + taskId + " thành công !!!");
        }).catch(error => {
            console.log("Lỗi không xóa được task id=" + taskId + "\nError:" + error);
        });

        res.redirect('/');
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

    showTask: (req, res) => {
        taskModel.loadAll().then(rows => {
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
        taskModel.updateStatus(taskId, status).then(values => {
            console.log("Update status thành công");
        }).catch(error => {
            console.log("Update status thất bại");
        });
        res.end();
    }
}

module.exports = TaskControllers;