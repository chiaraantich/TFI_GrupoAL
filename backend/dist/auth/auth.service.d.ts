import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly usuariosRepo;
    private readonly jwtService;
    constructor(usuariosRepo: Repository<Usuario>, jwtService: JwtService);
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
