import { pool } from './DB';

export class SupportTicketsRepository {
  async getAll() {
    const query = `
      SELECT t.id, u.full_name, t.subject, t.description, t.status, t.created_at
      FROM support_tickets t
      JOIN users u ON t.user_id = u.id
      ORDER BY t.created_at DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async create(userId: number, subject: string, description: string) {
    try {
      const query = `
        INSERT INTO support_tickets (user_id, subject, description)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const result = await pool.query(query, [userId, subject, description]);
      return result.rows[0];
    } catch (error: any) {
      if (error.code === '23503') {
        throw new Error(`El usuario con ID ${userId} no existe en la base de datos.`);
      }
      throw error;
    }
  }
}