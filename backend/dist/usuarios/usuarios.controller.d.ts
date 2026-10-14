import { UsuariosService } from './usuarios.service';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    listarPacientes(): Promise<import("./dto/paciente-response.dto").PacienteResponseDto[]>;
}
