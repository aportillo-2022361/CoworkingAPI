import { StaffRepository } from '../data/staffRepository';

export class StaffService {
  private repo = new StaffRepository();

  async getStaff() { return await this.repo.getAll(); }
  async createStaff(name: string, role: string) {
    return await this.repo.create(name, role);
  }
}