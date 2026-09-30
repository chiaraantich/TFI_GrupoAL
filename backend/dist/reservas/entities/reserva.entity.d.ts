import { EstadoReserva } from '../../common/enums';
import { Medico } from '../../medicos/entities/medico.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
export declare class Reserva {
    id: number;
    medico: Medico;
    paciente: Usuario;
    fecha_hora: Date;
    estado: EstadoReserva;
    valor_consulta: number;
}
