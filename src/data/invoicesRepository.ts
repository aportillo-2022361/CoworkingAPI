import { pool } from './DB';
import { Invoice } from '../modules/invoicesModule';

export class InvoicesRepository {
  async getAll(): Promise<Invoice[]> {
    const res = await pool.query('SELECT * FROM invoices ORDER BY id ASC');
    return res.rows;
  }

  async create(userId: number, amount: number): Promise<Invoice> {
    const res = await pool.query(
      'INSERT INTO invoices (user_id, amount) VALUES ($1, $2) RETURNING *',
      [userId, amount]
    );
    return res.rows[0];
  }
}