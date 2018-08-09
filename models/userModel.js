const db = require('../database/db');

exports.loadUserById = (id) => {
    let sql = `select * from user where id = '${id}'`;
    console.log(sql);
    return db.load(sql);
}

exports.add = (id, fullname, email, avatar, access_token, provider) => {
    let sql = `INSERT INTO user (id, fullname, email, avatar, access_token, provider) VALUES ('${id}', '${fullname}', '${email}', '${avatar}', '${access_token}', '${provider}')`;
    console.log(sql);
    return db.save(sql);
}