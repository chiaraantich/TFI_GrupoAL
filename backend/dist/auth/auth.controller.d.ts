import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RolUsuario } from '../common/enums';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        usuario: {
            id: number;
            nombres: string;
            apellidos: string;
            rol: RolUsuario;
        };
    }>;
    perfil(req: any): any;
    soloAdmin(req: any): {
        mensaje: string;
        user: any;
    };
}
