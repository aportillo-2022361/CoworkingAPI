import { UsersRepository } from '../data/usersRepository';

export class UsersService {
  private repo = new UsersRepository();

  async getUsers() { return await this.repo.getAll(); }
  async createUser(name: string, email: string) {
    if (!email.includes('@')) throw new Error('Email inválido.');
    return await this.repo.create(name, email);
  }
}