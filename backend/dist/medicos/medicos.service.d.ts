import { Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { ActualizarValorConsultaDto } from './dto/actualizar-valor-consulta.dto';
export declare class MedicosService {
    private readonly medicosRepo;
    constructor(medicosRepo: Repository<Medico>);
    actualizarValorConsulta(medicoId: number, dto: ActualizarValorConsultaDto): Promise<Medico>;
}
