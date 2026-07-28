import { pool } from './DB';
import { SupportTicket } from '../modules/supportTicketsModule';

export class SupportTicketsRepository {
  async getAll(): Promise<SupportTicket[]> {
    const res = await pool.query('SELECT * FROM support_tickets ORDER BY id ASC');
    return res.rows;
  }

  async create(userId: number, subject: string, description: string): Promise<SupportTicket> {
    const res = await pool.query(
      'INSERT INTO support_tickets (user_id, subject, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, subject, description]
    );
    return res.rows[0];
  }
}