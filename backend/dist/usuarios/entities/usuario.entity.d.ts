import { EstadoUsuario, RolUsuario } from '../../common/enums';
import { Medico } from '../../medicos/entities/medico.entity';
import { Reserva } from '../../reservas/entities/reserva.entity';
export declare class Usuario {
    id: number;
    documento: string;
    apellidos: string;
    nombres: string;
    email: string;
    clave: string;
    estado: EstadoUsuario;
    rol: RolUsuario;
    medico: Medico;
    reservas: Reserva[];
}
