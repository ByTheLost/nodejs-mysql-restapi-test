import { createPool } from 'mysql2/promise';

/* export const pool = createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1002543180',
  database: 'Claimsdb'  
}); */

export const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

