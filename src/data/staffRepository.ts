import { pool } from './DB';
import { Staff } from '../modules/staffModule';

export class StaffRepository {
  async getAll(): Promise<Staff[]> {
    const res = await pool.query('SELECT * FROM staff ORDER BY id ASC');
    return res.rows;
  }

  async create(fullName: string, role: string): Promise<Staff> {
    const res = await pool.query(
      'INSERT INTO staff (full_name, role) VALUES ($1, $2) RETURNING *',
      [fullName, role]
    );
    return res.rows[0];
  }
}