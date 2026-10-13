import { ApiProperty } from '@nestjs/swagger';

export class DisponibilidadResponseDto {
  @ApiProperty()
  id_medico: number;

  @ApiProperty({ example: '2026-10-14' })
  fecha: string;

  @ApiProperty({ type: [String], example: ['09:00', '10:00', '11:00'] })
  horarios: string[];
}