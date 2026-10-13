import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { EstadoUsuario } from '../common/enums';
import { ActualizarValorConsultaDto } from './dto/actualizar-valor-consulta.dto';
import { MedicoResponseDto } from './dto/medico-response.dto';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicosRepo: Repository<Medico>,
  ) {}

  private aDto(medico: Medico): MedicoResponseDto {
    return {
      id: medico.id,
      nombre: `${medico.usuario.nombres} ${medico.usuario.apellidos}`,
      matricula: medico.matricula,
      valor_consulta: medico.valor_consulta,
    };
  }

  async listar(): Promise<MedicoResponseDto[]> {
    const medicos = await this.medicosRepo.find({
      where: { usuario: { estado: EstadoUsuario.ACTIVO } },
      relations: { usuario: true },
      order: { id: 'ASC' },
    });
    return medicos.map((m) => this.aDto(m));
  }

  async actualizarValorConsulta(
    medicoId: number,
    dto: ActualizarValorConsultaDto,
  ): Promise<MedicoResponseDto> {
    const medico = await this.medicosRepo.findOne({
      where: { id: medicoId },
      relations: { usuario: true },
    });
    if (!medico) {
      throw new NotFoundException('Médico no encontrado');
    }

    medico.valor_consulta = dto.valor_consulta;
    const guardado = await this.medicosRepo.save(medico);
    return this.aDto(guardado);
  }
}