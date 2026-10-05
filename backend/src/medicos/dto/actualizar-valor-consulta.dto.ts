import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class ActualizarValorConsultaDto {
  @ApiProperty({ example: 16000 })
  @IsInt()
  @Min(0)
  valor_consulta: number;
}