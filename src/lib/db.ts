import mysql from 'mysql2/promise';

const pool = mysql.createPool;({
    host: 'localhost',
    user: '',
    password: '',
    database: ''
})