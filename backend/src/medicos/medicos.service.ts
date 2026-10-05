import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { ActualizarValorConsultaDto } from './dto/actualizar-valor-consulta.dto';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicosRepo: Repository<Medico>,
  ) {}

  async actualizarValorConsulta(medicoId: number, dto: ActualizarValorConsultaDto) {
    const medico = await this.medicosRepo.findOne({
      where: { id: medicoId },
      relations: { usuario: true },
    });
    if (!medico) {
      throw new NotFoundException('Médico no encontrado');
    }

    medico.valor_consulta = dto.valor_consulta;
    return this.medicosRepo.save(medico);
  }
}