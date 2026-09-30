import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { Medico } from '../medicos/entities/medico.entity';
import { EstadoReserva } from '../common/enums';
import { ActualizarEstadoReservaDto } from './dto/actualizar-estado-reserva.dto';
import { ReservaResponseDto } from './dto/reserva-response.dto';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservasRepo: Repository<Reserva>,
    @InjectRepository(Medico)
    private readonly medicosRepo: Repository<Medico>,
  ) {}

  private aResponseDto(reserva: Reserva): ReservaResponseDto {
    return {
      id: reserva.id,
      fecha_hora: reserva.fecha_hora,
      estado: reserva.estado,
      valor_consulta: reserva.valor_consulta,
      paciente_nombre: `${reserva.paciente.nombres} ${reserva.paciente.apellidos}`,
      medico_nombre: `${reserva.medico.usuario.nombres} ${reserva.medico.usuario.apellidos}`,
    };
  }

  async turnosDelMedico(idUsuarioLogueado: number, fecha: string) {
    const medico = await this.medicosRepo.findOne({
      where: { usuario: { id: idUsuarioLogueado } },
    });
    if (!medico) {
      throw new NotFoundException('No se encontró un médico para este usuario');
    }

    const inicio = new Date(`${fecha}T00:00:00`);
    const fin = new Date(`${fecha}T23:59:59`);

    const reservas = await this.reservasRepo.find({
      where: { medico: { id: medico.id }, fecha_hora: Between(inicio, fin) },
      relations: { paciente: true, medico: { usuario: true } },
      order: { fecha_hora: 'ASC' },
    });

    return reservas.map((r) => this.aResponseDto(r));
  }

  async marcarEstado(
    idUsuarioLogueado: number,
    reservaId: number,
    dto: ActualizarEstadoReservaDto,
  ) {
    const medico = await this.medicosRepo.findOne({
      where: { usuario: { id: idUsuarioLogueado } },
    });
    if (!medico) {
      throw new NotFoundException('No se encontró un médico para este usuario');
    }

    const reserva = await this.reservasRepo.findOne({
      where: { id: reservaId },
      relations: { medico: { usuario: true }, paciente: true },
    });
    if (!reserva) {
      throw new NotFoundException('Turno no encontrado');
    }

    if (reserva.medico.id !== medico.id) {
      throw new ForbiddenException('No podés modificar turnos de otro médico');
    }

    if (reserva.estado !== EstadoReserva.ACTIVO) {
      throw new BadRequestException('Solo se puede modificar un turno en estado ACTIVO');
    }

    reserva.estado = dto.estado;
    const guardada = await this.reservasRepo.save(reserva);
    return this.aResponseDto(guardada);
  }
}