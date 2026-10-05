import { ReservasService } from './reservas.service';
import { ActualizarEstadoReservaDto } from './dto/actualizar-estado-reserva.dto';
import { CrearReservaDto } from './dto/crear-reserva.dto';
export declare class ReservasController {
    private readonly reservasService;
    constructor(reservasService: ReservasService);
    turnosDelMedico(req: any, fecha: string): Promise<import("./dto/reserva-response.dto").ReservaResponseDto[]>;
    marcarEstado(req: any, id: string, dto: ActualizarEstadoReservaDto): Promise<import("./dto/reserva-response.dto").ReservaResponseDto>;
    crearReserva(req: any, dto: CrearReservaDto): Promise<import("./dto/reserva-response.dto").ReservaResponseDto>;
    misTurnos(req: any): Promise<import("./dto/reserva-response.dto").ReservaResponseDto[]>;
    listarTodas(): Promise<import("./dto/reserva-response.dto").ReservaResponseDto[]>;
    cancelar(req: any, id: string): Promise<import("./dto/reserva-response.dto").ReservaResponseDto>;
}
