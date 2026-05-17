import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool(process.env.DATABASE_URL as string);

export async function testConnection(): Promise<void> {
  const conn = await pool.getConnection();
  console.log('✅ Banco de dados conectado com sucesso.');
  conn.release();
}

export default pool;