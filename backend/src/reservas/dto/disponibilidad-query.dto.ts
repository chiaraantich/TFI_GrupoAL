import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt } from 'class-validator';

export class DisponibilidadQueryDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  id_medico: number;

  @ApiProperty({ example: '2026-10-14' })
  @IsDateString()
  fecha: string;
}