import { DesksRepository } from '../data/desksRepository';

export class DesksService {
  private repo = new DesksRepository();

  async getDesks() {
    return await this.repo.getDesks();
  }

  async createDesk(spaceId: number, code: string) {
    return await this.repo.createDesk(spaceId, code);
  }
}