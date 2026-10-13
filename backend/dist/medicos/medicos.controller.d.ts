import { MedicosService } from './medicos.service';
import { ActualizarValorConsultaDto } from './dto/actualizar-valor-consulta.dto';
export declare class MedicosController {
    private readonly medicosService;
    constructor(medicosService: MedicosService);
    listar(): Promise<import("./dto/medico-response.dto").MedicoResponseDto[]>;
    actualizarValorConsulta(id: string, dto: ActualizarValorConsultaDto): Promise<import("./dto/medico-response.dto").MedicoResponseDto>;
}
