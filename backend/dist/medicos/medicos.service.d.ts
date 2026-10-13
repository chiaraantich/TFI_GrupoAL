import { Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { ActualizarValorConsultaDto } from './dto/actualizar-valor-consulta.dto';
import { MedicoResponseDto } from './dto/medico-response.dto';
export declare class MedicosService {
    private readonly medicosRepo;
    constructor(medicosRepo: Repository<Medico>);
    private aDto;
    listar(): Promise<MedicoResponseDto[]>;
    actualizarValorConsulta(medicoId: number, dto: ActualizarValorConsultaDto): Promise<MedicoResponseDto>;
}
