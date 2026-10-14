import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { EstadoUsuario, RolUsuario } from '../common/enums';
import { PacienteResponseDto } from './dto/paciente-response.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
  ) {}

  async listarPacientes(): Promise<PacienteResponseDto[]> {
    const pacientes = await this.usuariosRepo.find({
      where: { rol: RolUsuario.PACIENTE, estado: EstadoUsuario.ACTIVO },
      order: { apellidos: 'ASC', nombres: 'ASC' },
    });

    return pacientes.map((p) => ({
      id: p.id,
      documento: p.documento,
      nombre: `${p.apellidos}, ${p.nombres}`,
    }));
  }
}