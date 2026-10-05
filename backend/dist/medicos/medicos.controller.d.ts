import { MedicosService } from './medicos.service';
import { ActualizarValorConsultaDto } from './dto/actualizar-valor-consulta.dto';
export declare class MedicosController {
    private readonly medicosService;
    constructor(medicosService: MedicosService);
    actualizarValorConsulta(id: string, dto: ActualizarValorConsultaDto): Promise<import("./entities/medico.entity").Medico>;
}
