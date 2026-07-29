import { pool } from './DB';

export class AccessControlRepository {
  async validateAccessCredentials(accessCode: string) {
    const query = `
      SELECT 
        u.id AS user_id,
        u.full_name,
        CASE 
          WHEN COUNT(um.id) FILTER (WHERE um.end_date >= CURRENT_DATE) > 0 THEN TRUE
          ELSE FALSE
        END AS has_active_membership
      FROM users u
      LEFT JOIN user_memberships um ON u.id = um.user_id
      WHERE u.card_access_key = $1 OR u.id::text = $1
      GROUP BY u.id, u.full_name;
    `;

    const result = await pool.query(query, [accessCode]);
    return result.rows[0] || null;
  }

  async logAccessAttempt(userId: number | null, accessType: string, accessCode: string, granted: boolean) {
    const query = `
      INSERT INTO access_logs (user_id, access_type, access_code, granted)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [userId, accessType, accessCode, granted];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getLogs() {
    const query = `
      SELECT a.id, u.full_name, a.access_type, a.access_code, a.entry_time, a.granted
      FROM access_logs a
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.entry_time DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async generateCode(userId: number) {
    const userCheck = await pool.query('SELECT id FROM users WHERE id = $1;', [userId]);
    if (userCheck.rows.length === 0) {
      throw new Error(`El usuario con ID ${userId} no existe.`);
    }

    const accessPin = Math.floor(100000 + Math.random() * 900000).toString();
    await pool.query('UPDATE users SET card_access_key = $1 WHERE id = $2;', [accessPin, userId]);
    return { access_code: accessPin };
  }
}