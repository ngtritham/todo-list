const db = require('../database/db');

exports.loadAllById = (parentId) => {
    let sql = `select * from tasks where id = ${parentId}`;
    return db.load(sql);
}

exports.loadAll = () => {
    let sql = `select * from tasks`;
    return db.load(sql);
}