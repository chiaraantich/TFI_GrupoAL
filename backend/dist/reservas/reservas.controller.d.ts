import { ReservasService } from './reservas.service';
import { ActualizarEstadoReservaDto } from './dto/actualizar-estado-reserva.dto';
export declare class ReservasController {
    private readonly reservasService;
    constructor(reservasService: ReservasService);
    turnosDelMedico(req: any, fecha: string): Promise<import("./dto/reserva-response.dto").ReservaResponseDto[]>;
    marcarEstado(req: any, id: string, dto: ActualizarEstadoReservaDto): Promise<import("./dto/reserva-response.dto").ReservaResponseDto>;
}
