import { pool } from './DB';

export class InvoicesRepository {
  async getAll() {
    const query = `
      SELECT i.id, u.full_name, i.amount, i.issued_at
      FROM invoices i
      JOIN users u ON i.user_id = u.id
      ORDER BY i.issued_at DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async create(userId: number, amount: number) {
    try {
      const query = `
        INSERT INTO invoices (user_id, amount)
        VALUES ($1, $2)
        RETURNING *;
      `;
      const result = await pool.query(query, [userId, amount]);
      return result.rows[0];
    } catch (error: any) {
      if (error.code === '23503') {
        throw new Error(`No se pudo generar la factura: El usuario con ID ${userId} no existe.`);
      }
      throw error;
    }
  }
}