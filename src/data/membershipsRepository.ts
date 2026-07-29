import { pool } from './DB';

export class MembershipsRepository {
  async getAll() {
    const result = await pool.query('SELECT * FROM memberships ORDER BY id ASC;');
    return result.rows;
  }

  async create(name: string, price: number, durationDays: number) {
    const query = `
      INSERT INTO memberships (name, price, duration_days)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await pool.query(query, [name, price, durationDays]);
    return result.rows[0];
  }
}