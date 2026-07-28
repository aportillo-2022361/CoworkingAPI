import { ReservationRepository } from '../data/reservationRepository';

export class ReservationService {
  private repo = new ReservationRepository();

  async getReservations() { return await this.repo.getAll(); }
  async createReservation(userId: number, deskId: number) {
    return await this.repo.create(userId, deskId);
  }
}