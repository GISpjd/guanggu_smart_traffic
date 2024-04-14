const mysql = require('mysql')
const con = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'guanggu_smart_traffic',
    timezone: 'SYSTEM',
})

con.connect()


/**
 * 获取所有数据
 * @param {string} sql 
 * @param {Array} params 
 * @returns {Promise}
 */
function getAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        con.query(sql, params, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}


/**
 * 获取一个数据
 * @param {string} sql 
 * @param {Array} params 
 * @returns {Promise}
 */
function getOne(sql, params = []) {
    return new Promise((resolve, reject) => {
        con.query(sql, params, (err, data) => {
            if (err) reject(err);
            data && data.length != 0 ? resolve(data) : resolve(null);
        })
    })
}


/**
 * 执行sql语句
 * @param {string} sql 
 * @param {Array} params 
 * @returns {Promise}
 */
function exec(sql, params = []) {
    return new Promise((resolve, reject) => {
        con.query(sql, params, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = { getAll, getOne, exec }

