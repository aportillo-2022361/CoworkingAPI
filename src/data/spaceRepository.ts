import { pool } from './DB';

export class SpaceRepository {
  async getSpaces() {
    const query = 'SELECT id, name, building, capacity FROM spaces ORDER BY id ASC;';
    const result = await pool.query(query);
    return result.rows;
  }

  async createSpace(name: string, building: string, capacity: number) {
    const query = `
      INSERT INTO spaces (name, building, capacity)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await pool.query(query, [name, building, capacity]);
    return result.rows[0];
  }
}