import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Print environment variables for debugging
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST ,
  port: process.env.DB_PORT ?? 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to DataBase');
    connection.release();
  } catch (error) {
    console.error('Error connecting to DataBase:', error.message);
    process.exit(1);
  }
};

export { pool, connectDB };
