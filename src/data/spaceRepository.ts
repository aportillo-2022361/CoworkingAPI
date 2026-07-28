import { pool } from './DB';
import { Space } from '../modules/spaceModule';

export class SpaceRepository {
  async getAll(): Promise<Space[]> {
    const res = await pool.query('SELECT * FROM spaces ORDER BY id ASC');
    return res.rows;
  }

  async create(name: string, building: string, capacity: number): Promise<Space> {
    const res = await pool.query(
      'INSERT INTO spaces (name, building, capacity) VALUES ($1, $2, $3) RETURNING *',
      [name, building, capacity]
    );
    return res.rows[0];
  }
}