import { AccessControlRepository } from '../data/accessControlRepository';

export class AccessControlService {
  private repo = new AccessControlRepository();

  async getLogs() { return await this.repo.getAll(); }
  async generateCode(userId: number) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return await this.repo.create(userId, 'CODE', code);
  }
}