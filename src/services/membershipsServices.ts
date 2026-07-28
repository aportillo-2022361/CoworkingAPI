import { MembershipsRepository } from '../data/membershipsRepository';

export class MembershipsService {
  private repo = new MembershipsRepository();

  async getMemberships() { return await this.repo.getAll(); }
  async createMembership(name: string, price: number, durationDays: number) {
    return await this.repo.create(name, price, durationDays);
  }
}