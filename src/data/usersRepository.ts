import { pool } from './DB';
import { User } from '../modules/usersModule';

export class UsersRepository {
  async getAll(): Promise<User[]> {
    const res = await pool.query('SELECT * FROM users ORDER BY id ASC');
    return res.rows;
  }

  async create(fullName: string, email: string): Promise<User> {
    const res = await pool.query(
      'INSERT INTO users (full_name, email) VALUES ($1, $2) RETURNING *',
      [fullName, email]
    );
    return res.rows[0];
  }
}