import { ApiProperty } from '@nestjs/swagger';

export class MedicoResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: 'Laura Gómez' })
  nombre: string;

  @ApiProperty()
  matricula: number;

  @ApiProperty()
  valor_consulta: number;
}