import { SpaceRepository } from '../data/spaceRepository';

export class SpaceService {
  private repo = new SpaceRepository();

  async getSpaces() {
    return await this.repo.getSpaces();
  }

  async createSpace(name: string, building: string, capacity: number) {
    return await this.repo.createSpace(name, building, capacity);
  }
}