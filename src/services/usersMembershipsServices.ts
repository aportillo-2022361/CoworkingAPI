import { UsersMembershipsRepository } from '../data/usersMembershipsRepository';

export class UsersMembershipsService {
  private repo = new UsersMembershipsRepository();

  async getUserMemberships() {
    return await this.repo.getAllActive();
  }

  async assignMembership(userId: number, membershipId: number, durationDays: number) {
    return await this.repo.assignMembershipAndCard(userId, membershipId, durationDays);
  }
}