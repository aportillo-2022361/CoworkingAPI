import { pool } from './DB';
import { Reservation } from '../modules/reservationsModule';

export class ReservationRepository {
  async getAll(): Promise<Reservation[]> {
    const res = await pool.query(`
      SELECT r.id, u.full_name as user_name, d.code as desk_code, r.start_time, r.end_time, r.status
      FROM reservations r
      JOIN users u ON r.user_id = u.id
      JOIN desks d ON r.desk_id = d.id
      ORDER BY r.id ASC
    `);
    return res.rows;
  }

  async create(userId: number, deskId: number): Promise<Reservation> {
    const res = await pool.query(
      `INSERT INTO reservations (user_id, desk_id, start_time, end_time) 
       VALUES ($1, $2, NOW(), NOW() + INTERVAL '2 hours') RETURNING *`,
      [userId, deskId]
    );
    return res.rows[0];
  }
}