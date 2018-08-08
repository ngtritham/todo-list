const db = require('../database/db');

exports.loadAllById = (parentId) => {
    let sql = `select * from tasks where id = ${parentId}`;
    return db.load(sql);
}

exports.loadAll = () => {
    let sql = `select * from tasks`;
    return db.load(sql);
}

exports.add = (parent_id, content, start_date, end_date, user_id) => {
    let sql = `INSERT INTO tasks (parent_id, content, start_date, end_date, user_id) VALUES ('${parent_id}', '${content}', '${start_date}', '${end_date}', '${user_id}')`;
    console.log(sql);
    return db.save(sql);
}

exports.delete = (id) => {
    let sql = `UPDATE tasks SET deleted = 1 WHERE id = '${id}'`;
    return db.save(sql);
}

exports.edit = (taskId, content, start_date, end_date) => {
    let sql = `UPDATE tasks SET content = '${content}', start_date = '${start_date}', end_date = '${end_date}' WHERE id = '${taskId}'`;
    return db.save(sql);
}

exports.updateStatus = (id, status) => {
    let sql = `UPDATE tasks SET status = '${status}' WHERE id = '${id}'`;
    console.log(sql);
    return db.save(sql);
}