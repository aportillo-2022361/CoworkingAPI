import { question, pause, rl } from '../utils/readline';
import { pool } from '../data/DB';

import { UsersService } from '../services/usersServices';
import { StaffService } from '../services/staffServices';
import { SpaceService } from '../services/spaceServices';
import { DesksService } from '../services/desksServices';
import { MembershipsService } from '../services/membershipsServices';
import { UsersMembershipsService } from '../services/usersMembershipsServices';
import { ReservationService } from '../services/reservationsServices';
import { AccessControlService } from '../services/accessControlServices';
import { InvoicesService } from '../services/invoicesServices';
import { SupportTicketsService } from '../services/supportTicketsServices';

const usersService = new UsersService();
const staffService = new StaffService();
const spaceService = new SpaceService();
const desksService = new DesksService();
const membershipsService = new MembershipsService();
const usersMembershipsService = new UsersMembershipsService();
const reservationService = new ReservationService();
const accessService = new AccessControlService();
const invoicesService = new InvoicesService();
const ticketsService = new SupportTicketsService();

export async function runMenu() {
  let running = true;

  while (running) {
    console.clear();
    console.log('============================================');
    console.log('              COWORKING SYSTEM              ');
    console.log('============================================');
    console.log('1.  Listar Usuarios');
    console.log('2.  Registrar Usuario');
    console.log('3.  Listar Personal');
    console.log('4.  Registrar Personal');
    console.log('5.  Listar Espacios');
    console.log('6.  Registrar Espacio');
    console.log('7.  Listar Escritorios');
    console.log('8.  Registrar Escritorio');
    console.log('9.  Listar Planes de Membresía');
    console.log('10. Asignar Membresía a Usuario');
    console.log('11. Ver Membresías de Usuarios Activas');
    console.log('12. Generar Código PIN de Acceso');
    console.log('13. Crear Reserva de Escritorio');
    console.log('14. Simular Entrada al Edificio');
    console.log('15. Ver Registros de Acceso');
    console.log('16. Crear Factura');
    console.log('17. Reportar Problema a Soporte');
    console.log('18. Eliminar Usuario');
    console.log('0.  Salir');
    console.log('--------------------------------------------');

    const option = await question('Seleccione una opción: ');

    try {
      switch (option.trim()) {
        case '1':
          console.table(await usersService.getUsers());
          break;

        case '2':
          const uName = await question('Nombre completo del usuario: ');
          const uEmail = await question('Correo electrónico: ');
          await usersService.createUser(uName, uEmail);
          console.log('Usuario registrado.');
          break;

        case '3':
          console.table(await staffService.getStaff());
          break;

        case '4':
          const sName = await question('Nombre completo del personal: ');
          const sRole = await question('Cargo (ej. Recepcionista, Mantenimiento, Admin): ');
          const sEmail = await question('Correo electrónico: ');
          await staffService.createStaff(sName, sRole, sEmail);
          console.log('Personal registrado correctamente.');
          break;

        case '5':
          console.table(await spaceService.getSpaces());
          break;

        case '6':
          const spName = await question('Nombre del Espacio (ej. Zona Silent, Sala A): ');
          const spBuilding = await question('Edificio / Torre (ej. Edificio Central): ');
          const spCap = await question('Capacidad máxima de personas: ');
          await spaceService.createSpace(spName, spBuilding, Number(spCap));
          console.log('Espacio registrado correctamente.');
          break;

        case '7':
          console.table(await desksService.getDesks());
          break;

        case '8':
          const dSpaceId = await question('ID del Espacio al que pertenece el escritorio: ');
          const dCode = await question('Código del Escritorio (ej. D-101): ');
          await desksService.createDesk(Number(dSpaceId), dCode);
          console.log('Escritorio registrado correctamente.');
          break;

        case '9':
          console.table(await membershipsService.getMemberships());
          break;

        case '10':
          const uIdMem = await question('ID Usuario: ');
          const mIdMem = await question('ID Membresía: ');
          const days = await question('Días de duración (Default 30): ');
          const assignment = await usersMembershipsService.assignMembership(
            Number(uIdMem), 
            Number(mIdMem), 
            days ? Number(days) : 30
          );
          console.log('Membresía asignada exitosamente.');
          if (assignment?.cardKey) {
            console.log(`Clave de tarjeta asignada automáticamente: ${assignment.cardKey}`);
          }
          break;

        case '11':
          console.table(await usersMembershipsService.getUserMemberships());
          break;

        case '12':
          const uIdAcc = await question('ID Usuario: ');
          const log = await accessService.generateCode(Number(uIdAcc));
          console.log(`\nCÓDIGO PIN GENERADO: ${log.access_code}`);
          break;

        case '13':
          const uIdRes = await question('ID Usuario: ');
          const dIdRes = await question('ID Escritorio: ');
          await reservationService.createReservation(Number(uIdRes), Number(dIdRes));
          console.log('Reserva confirmada.');
          break;

        case '14':
          const code = await question('Ingrese o escanee la tarjeta/código/PIN (ej. CARD-1, 842109 o ID): ');
          if (!code.trim()) {
            console.log('Debe ingresar un código válido.');
            break;
          }
          const entryResult = await accessService.processBuildingEntry(code.trim());
          console.log(`\n${entryResult.message}`);
          break;

        case '15':
          console.table(await accessService.getLogs());
          break;

        case '16':
          const uIdInv = await question('ID Usuario: ');
          const amount = await question('Monto: ');
          await invoicesService.createInvoice(Number(uIdInv), Number(amount));
          console.log('Factura creada.');
          break;

        case '17':
          const uIdTick = await question('ID Usuario: ');
          const subj = await question('Asunto: ');
          const desc = await question('Descripción: ');
          await ticketsService.createTicket(Number(uIdTick), subj, desc);
          console.log('Ticket de soporte enviado.');
          break;

        case '18':
          const uIdDel = await question('ID Usuario a eliminar: ');
          const confirm = await question(`¿Está seguro de eliminar al usuario ID ${uIdDel}? (s/n): `);
          if (confirm.toLowerCase().trim() === 's') {
            const deleted = await usersService.deleteUser(Number(uIdDel));
            console.log(`Usuario '${deleted.full_name}' y sus registros asociados fueron eliminados.`);
          } else {
            console.log('Operación cancelada.');
          }
          break;

        case '0':
          console.log('Desconectando de PostgreSQL...');
          await pool.end();
          rl.close();
          running = false;
          process.exit(0);

        default:
          console.log('Opción no válida.');
          break;
      }
    } catch (err: any) {
      console.error('\nError:', err.message);
    }

    if (running) await pause();
  }
}