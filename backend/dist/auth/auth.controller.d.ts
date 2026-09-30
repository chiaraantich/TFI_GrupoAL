import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        usuario: {
            id: number;
            nombres: string;
            apellidos: string;
            rol: import("../common/enums").RolUsuario;
        };
    }>;
}
