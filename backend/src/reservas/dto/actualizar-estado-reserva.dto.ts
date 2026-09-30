import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { EstadoReserva } from '../../common/enums';

export class ActualizarEstadoReservaDto {
  @ApiProperty({ enum: [EstadoReserva.ATENDIDO, EstadoReserva.AUSENTE] })
  @IsEnum([EstadoReserva.ATENDIDO, EstadoReserva.AUSENTE])
  estado: EstadoReserva.ATENDIDO | EstadoReserva.AUSENTE;
}