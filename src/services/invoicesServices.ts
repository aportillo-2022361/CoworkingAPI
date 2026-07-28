import { InvoicesRepository } from '../data/invoicesRepository';

export class InvoicesService {
  private repo = new InvoicesRepository();

  async getInvoices() { return await this.repo.getAll(); }
  async createInvoice(userId: number, amount: number) {
    return await this.repo.create(userId, amount);
  }
}