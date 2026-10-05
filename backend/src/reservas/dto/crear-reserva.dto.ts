import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601, IsInt, IsOptional } from 'class-validator';

export class CrearReservaDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id_medico: number;

  @ApiPropertyOptional({ example: 2, description: 'Solo lo usa el admin, para reservar a nombre de un paciente' })
  @IsOptional()
  @IsInt()
  id_paciente?: number;

  @ApiProperty({ example: '2026-10-05T09:00:00' })
  @IsISO8601()
  fecha_hora: string;
}