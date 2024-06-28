import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 200,
}

const pool = mysql.createPool(dbConfig);

export async function query (sql: string, params: any[] = []) {
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    }   catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

export default pool;