import { pool } from './DB';
import { Membership } from '../modules/membershipsModule';

export class MembershipsRepository {
  async getAll(): Promise<Membership[]> {
    const res = await pool.query('SELECT * FROM memberships ORDER BY id ASC');
    return res.rows;
  }

  async create(name: string, price: number, durationDays: number): Promise<Membership> {
    const res = await pool.query(
      'INSERT INTO memberships (name, price, duration_days) VALUES ($1, $2, $3) RETURNING *',
      [name, price, durationDays]
    );
    return res.rows[0];
  }
}