import { ApiProperty } from '@nestjs/swagger';

export class PacienteResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: '22222222' })
  documento: string;

  @ApiProperty({ example: 'Pérez, Juan' })
  nombre: string;
}