import { UsersRepository } from '../data/usersRepository';

export class UsersService {
  private repo = new UsersRepository();

  async getUsers() {
    return await this.repo.getUsers();
  }

  async createUser(fullName: string, email: string) {
    return await this.repo.createUser(fullName, email);
  }

  async deleteUser(userId: number) {
    const deletedUser = await this.repo.deleteUser(userId);
    if (!deletedUser) {
      throw new Error(`El usuario con ID ${userId} no existe.`);
    }
    return deletedUser;
  }
}