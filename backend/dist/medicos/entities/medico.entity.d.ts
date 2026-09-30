import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Reserva } from '../../reservas/entities/reserva.entity';
export declare class Medico {
    id: number;
    usuario: Usuario;
    matricula: number;
    valor_consulta: number;
    reservas: Reserva[];
}
