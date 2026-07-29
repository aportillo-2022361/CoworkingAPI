import { pool } from './DB';

export class UsersMembershipsRepository {
  async getAllActive() {
    const query = `
      SELECT um.id, u.full_name, m.name as membership_name, um.start_date, um.end_date, u.card_access_key
      FROM user_memberships um
      JOIN users u ON um.user_id = u.id
      JOIN memberships m ON um.membership_id = m.id
      WHERE um.end_date >= CURRENT_DATE;
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async assignMembershipAndCard(userId: number, membershipId: number, durationDays: number) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const cardKey = `CARD-${userId}`;
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + durationDays);

      const insertQuery = `
        INSERT INTO user_memberships (user_id, membership_id, start_date, end_date)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
      `;
      await client.query(insertQuery, [userId, membershipId, startDate, endDate]);

      const updateUserQuery = `
        UPDATE users
        SET card_access_key = $1
        WHERE id = $2;
      `;
      await client.query(updateUserQuery, [cardKey, userId]);

      await client.query('COMMIT');

      return { membershipId, cardKey };
    } catch (error: any) {
      await client.query('ROLLBACK');

      if (error.code === '23503') {
        if (error.constraint?.includes('user_id')) {
          throw new Error(`No se puede asignar la membresía: El usuario con ID ${userId} no existe.`);
        }
        if (error.constraint?.includes('membership_id')) {
          throw new Error(`No se puede asignar la membresía: El plan con ID ${membershipId} no existe.`);
        }
        throw new Error('El usuario o la membresía especificada no existen en la base de datos.');
      }

      throw error;
    } finally {
      client.release();
    }
  }
}