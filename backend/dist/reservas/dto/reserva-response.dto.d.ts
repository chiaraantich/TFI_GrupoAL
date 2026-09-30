import { EstadoReserva } from '../../common/enums';
export declare class ReservaResponseDto {
    id: number;
    fecha_hora: Date;
    estado: EstadoReserva;
    valor_consulta: number;
    paciente_nombre: string;
    medico_nombre: string;
}
