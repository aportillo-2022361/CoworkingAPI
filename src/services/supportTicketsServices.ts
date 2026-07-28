import { SupportTicketsRepository } from '../data/supportTicketsRepository';

export class SupportTicketsService {
  private repo = new SupportTicketsRepository();

  async getTickets() { return await this.repo.getAll(); }
  async createTicket(userId: number, subject: string, description: string) {
    return await this.repo.create(userId, subject, description);
  }
}