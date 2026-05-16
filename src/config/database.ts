import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'mind_group_blog',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Aiven (e a maioria dos DBaaS) exige SSL em produção.
  // rejectUnauthorized: false aceita o certificado auto-assinado deles
  // sem precisar embutir o CA no bundle do Render.
  ssl: isProduction ? { rejectUnauthorized: false } : undefined,
});

export async function testConnection(): Promise<void> {
  const conn = await pool.getConnection();
  console.log('✅ Banco de dados conectado com sucesso.');
  conn.release();
}

export default pool;
