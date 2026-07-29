import { pool } from './DB';

export class StaffRepository {
  async getStaff() {
    const query = 'SELECT id, full_name, role, email FROM staff ORDER BY id ASC;';
    const result = await pool.query(query);
    return result.rows;
  }

  async createStaff(fullName: string, role: string, email: string) {
    const query = `
      INSERT INTO staff (full_name, role, email)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await pool.query(query, [fullName, role, email]);
    return result.rows[0];
  }
}