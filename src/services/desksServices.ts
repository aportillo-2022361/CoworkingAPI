import { DesksRepository } from '../data/desksRepository';

export class DesksService {
  private repo = new DesksRepository();

  async getDesks() { return await this.repo.getAll(); }
  async createDesk(code: string, spaceId: number) {
    return await this.repo.create(code, spaceId);
  }
}