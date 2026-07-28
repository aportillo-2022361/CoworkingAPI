import { pool } from './DB';
import { AccessLog } from '../modules/accessControlModule';

export class AccessControlRepository {
  async getAll(): Promise<AccessLog[]> {
    const res = await pool.query(`
      SELECT a.id, u.full_name, a.access_type, a.access_code, a.granted, a.entry_time
      FROM access_logs a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.entry_time DESC
    `);
    return res.rows;
  }

  async create(userId: number, accessType: 'CARD' | 'CODE', code: string): Promise<AccessLog> {
    const res = await pool.query(
      'INSERT INTO access_logs (user_id, access_type, access_code, granted) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, accessType, code, true]
    );
    return res.rows[0];
  }
}