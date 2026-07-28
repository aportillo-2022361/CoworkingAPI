import { pool } from './DB';
import { Desk } from '../modules/desksModule';

export class DesksRepository {
  async getAll(): Promise<Desk[]> {
    const res = await pool.query('SELECT * FROM desks ORDER BY id ASC');
    return res.rows;
  }

  async create(code: string, spaceId: number): Promise<Desk> {
    const res = await pool.query(
      'INSERT INTO desks (code, space_id) VALUES ($1, $2) RETURNING *',
      [code, spaceId]
    );
    return res.rows[0];
  }
}