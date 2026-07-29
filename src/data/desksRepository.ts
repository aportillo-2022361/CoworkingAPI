import { pool } from './DB';

export class DesksRepository {
  async getDesks() {
    const query = `
      SELECT d.id, d.code, s.name AS space_name, s.building
      FROM desks d
      JOIN spaces s ON d.space_id = s.id
      ORDER BY d.id ASC;
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async createDesk(spaceId: number, code: string) {
    try {
      const query = `
        INSERT INTO desks (space_id, code)
        VALUES ($1, $2)
        RETURNING *;
      `;
      const result = await pool.query(query, [spaceId, code]);
      return result.rows[0];
    } catch (error: any) {
      if (error.code === '23503') {
        throw new Error(`No se puede crear el escritorio: El espacio con ID ${spaceId} no existe.`);
      }
      throw error;
    }
  }
}