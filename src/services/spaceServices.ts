import { SpaceRepository } from '../data/spaceRepository';

export class SpaceService {
  private repo = new SpaceRepository();

  async getSpaces() { return await this.repo.getAll(); }
  async createSpace(name: string, building: string, capacity: number) {
    return await this.repo.create(name, building, capacity);
  }
}