import { ApiProperty } from '@nestjs/swagger';
import { EstadoReserva } from '../../common/enums';

export class ReservaResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fecha_hora: Date;

  @ApiProperty({ enum: EstadoReserva })
  estado: EstadoReserva;

  @ApiProperty()
  valor_consulta: number;

  @ApiProperty()
  paciente_nombre: string;

  @ApiProperty()
  medico_nombre: string;
}