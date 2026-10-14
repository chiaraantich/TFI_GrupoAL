import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { PacienteResponseDto } from './dto/paciente-response.dto';
export declare class UsuariosService {
    private readonly usuariosRepo;
    constructor(usuariosRepo: Repository<Usuario>);
    listarPacientes(): Promise<PacienteResponseDto[]>;
}
