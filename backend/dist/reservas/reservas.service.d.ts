import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { Medico } from '../medicos/entities/medico.entity';
import { ActualizarEstadoReservaDto } from './dto/actualizar-estado-reserva.dto';
import { ReservaResponseDto } from './dto/reserva-response.dto';
export declare class ReservasService {
    private readonly reservasRepo;
    private readonly medicosRepo;
    constructor(reservasRepo: Repository<Reserva>, medicosRepo: Repository<Medico>);
    private aResponseDto;
    turnosDelMedico(idUsuarioLogueado: number, fecha: string): Promise<ReservaResponseDto[]>;
    marcarEstado(idUsuarioLogueado: number, reservaId: number, dto: ActualizarEstadoReservaDto): Promise<ReservaResponseDto>;
}
