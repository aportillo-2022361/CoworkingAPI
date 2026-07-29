import { StaffRepository } from '../data/staffRepository';

export class StaffService {
  private repo = new StaffRepository();

  async getStaff() {
    return await this.repo.getStaff();
  }

  async createStaff(fullName: string, role: string, email: string) {
    return await this.repo.createStaff(fullName, role, email);
  }
}