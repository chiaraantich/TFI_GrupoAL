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
import { Usuario } from '../usuarios/entities/usuario.entity';
import { EstadoReserva, RolUsuario } from '../common/enums';
import { ActualizarEstadoReservaDto } from './dto/actualizar-estado-reserva.dto';
import { ReservaResponseDto } from './dto/reserva-response.dto';
import { CrearReservaDto } from './dto/crear-reserva.dto';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservasRepo: Repository<Reserva>,
    @InjectRepository(Medico)
    private readonly medicosRepo: Repository<Medico>,
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
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
      throw new ForbiddenException('No puedes modificar turnos de otro médico');
    }

    if (reserva.estado !== EstadoReserva.ACTIVO) {
      throw new BadRequestException('Solo se puede modificar un turno en estado ACTIVO');
    }

    reserva.estado = dto.estado;
    const guardada = await this.reservasRepo.save(reserva);
    return this.aResponseDto(guardada);
  }

  async crearReserva(
    idUsuarioLogueado: number,
    rolLogueado: RolUsuario,
    dto: CrearReservaDto,
  ) {
    // 1. Determinar para quién es el turno
    let idPaciente: number;
    if (rolLogueado === RolUsuario.ADMINISTRADOR) {
      if (!dto.id_paciente) {
        throw new BadRequestException('El admin debe indicar id_paciente');
      }
      idPaciente = dto.id_paciente;
    } else {
      idPaciente = idUsuarioLogueado;
    }

    const paciente = await this.usuariosRepo.findOne({ where: { id: idPaciente } });
    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }

    const medico = await this.medicosRepo.findOne({
      where: { id: dto.id_medico },
      relations: { usuario: true },
    });
    if (!medico) {
      throw new NotFoundException('Médico no encontrado');
    }

    // 2. Validar horario: en punto, entre 8 y 15 hs (el turno de 15 a 16 es el último)
    const fecha = new Date(dto.fecha_hora);
    if (isNaN(fecha.getTime())) {
      throw new BadRequestException('Fecha y hora inválidas');
    }
    if (fecha.getMinutes() !== 0 || fecha.getSeconds() !== 0) {
      throw new BadRequestException('Los turnos son en horas en punto');
    }
    const hora = fecha.getHours();
    if (hora < 8 || hora > 15) {
      throw new BadRequestException('El horario de atención es de 8 a 16 hs');
    }

    // 3. No permitir reservar en el pasado
    const ahora = new Date();
    if (fecha.getTime() < ahora.getTime()) {
      throw new BadRequestException('No se puede reservar un turno en el pasado');
    }

    // 4. Máximo 30 días de anticipación
    const limite = new Date();
    limite.setDate(limite.getDate() + 30);
    if (fecha.getTime() > limite.getTime()) {
      throw new BadRequestException(
        'Las reservas se pueden hacer con un máximo de 30 días de anticipación',
      );
    }

    // 5. Que el horario no esté ocupado para ese médico
    const existente = await this.reservasRepo.findOne({
      where: {
        medico: { id: medico.id },
        fecha_hora: fecha,
        estado: EstadoReserva.ACTIVO,
      },
    });
    if (existente) {
      throw new BadRequestException('Ese horario ya está ocupado para el médico');
    }

    // 6. Crear la reserva, congelando el valor de consulta actual del médico
    const nuevaReserva = this.reservasRepo.create({
      medico,
      paciente,
      fecha_hora: fecha,
      estado: EstadoReserva.ACTIVO,
      valor_consulta: medico.valor_consulta,
    });

    const guardada = await this.reservasRepo.save(nuevaReserva);
    const completa = await this.reservasRepo.findOne({
      where: { id: guardada.id },
      relations: { paciente: true, medico: { usuario: true } },
    });

    return this.aResponseDto(completa!);
  }
}