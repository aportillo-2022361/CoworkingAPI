import { AccessControlRepository } from '../data/accessControlRepository';

export class AccessControlService {
  private repo = new AccessControlRepository();

  async getLogs() {
    return await this.repo.getLogs();
  }

  async generateCode(userId: number) {
    return await this.repo.generateCode(userId);
  }

  async processBuildingEntry(accessCode: string) {
    const userValidation = await this.repo.validateAccessCredentials(accessCode);
    const accessType = accessCode.startsWith('CARD') ? 'CARD' : 'CODE';

    if (!userValidation) {
      await this.repo.logAccessAttempt(null, accessType, accessCode, false);
      return {
        success: false,
        message: `Acceso Denegado: La credencial '${accessCode}' no está registrada en el sistema.`,
      };
    }

    if (!userValidation.has_active_membership) {
      await this.repo.logAccessAttempt(userValidation.user_id, accessType, accessCode, false);
      return {
        success: false,
        message: `Acceso Denegado: El usuario '${userValidation.full_name}' no posee una membresía vigente.`,
      };
    }

    await this.repo.logAccessAttempt(userValidation.user_id, accessType, accessCode, true);
    return {
      success: true,
      message: `Acceso Concedido: Bienvenido/a '${userValidation.full_name}'. Entrada registrada correctamente.`,
    };
  }
}