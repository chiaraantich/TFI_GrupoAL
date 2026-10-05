import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { Medico } from '../medicos/entities/medico.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { RolUsuario } from '../common/enums';
import { ActualizarEstadoReservaDto } from './dto/actualizar-estado-reserva.dto';
import { ReservaResponseDto } from './dto/reserva-response.dto';
import { CrearReservaDto } from './dto/crear-reserva.dto';
export declare class ReservasService {
    private readonly reservasRepo;
    private readonly medicosRepo;
    private readonly usuariosRepo;
    constructor(reservasRepo: Repository<Reserva>, medicosRepo: Repository<Medico>, usuariosRepo: Repository<Usuario>);
    private aResponseDto;
    turnosDelMedico(idUsuarioLogueado: number, fecha: string): Promise<ReservaResponseDto[]>;
    marcarEstado(idUsuarioLogueado: number, reservaId: number, dto: ActualizarEstadoReservaDto): Promise<ReservaResponseDto>;
    crearReserva(idUsuarioLogueado: number, rolLogueado: RolUsuario, dto: CrearReservaDto): Promise<ReservaResponseDto>;
    misTurnos(idUsuarioLogueado: number): Promise<ReservaResponseDto[]>;
    listarTodas(): Promise<ReservaResponseDto[]>;
    cancelar(idUsuarioLogueado: number, rolLogueado: RolUsuario, reservaId: number): Promise<ReservaResponseDto>;
}
