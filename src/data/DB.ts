import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export const conexionDB = new Pool({
  user: process.env.DB_USER || 'admin',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'coworking_api',
  password: process.env.DB_PASSWORD || 'admin',
  port: Number(process.env.DB_PORT) || 5432,
});