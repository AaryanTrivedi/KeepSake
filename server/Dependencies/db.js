const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'asus',
    password:'',
    database: 'posts_app',
});
module.exports = pool;
