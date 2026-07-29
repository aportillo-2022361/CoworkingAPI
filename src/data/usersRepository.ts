import { pool } from './DB';

export class UsersRepository {
  async getUsers() {
    const result = await pool.query('SELECT * FROM users ORDER BY id ASC;');
    return result.rows;
  }

  async createUser(fullName: string, email: string) {
    const query = `
      INSERT INTO users (full_name, email)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await pool.query(query, [fullName, email]);
    return result.rows[0];
  }

  async deleteUser(userId: number) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      await client.query('DELETE FROM access_logs WHERE user_id = $1;', [userId]);
      await client.query('DELETE FROM reservations WHERE user_id = $1;', [userId]);
      await client.query('DELETE FROM invoices WHERE user_id = $1;', [userId]);
      await client.query('DELETE FROM support_tickets WHERE user_id = $1;', [userId]);
      await client.query('DELETE FROM user_memberships WHERE user_id = $1;', [userId]);

      const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *;', [userId]);

      await client.query('COMMIT');
      return result.rows[0] || null;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}