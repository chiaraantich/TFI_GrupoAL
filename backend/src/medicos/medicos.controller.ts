import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MedicosService } from './medicos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolUsuario } from '../common/enums';
import { ActualizarValorConsultaDto } from './dto/actualizar-valor-consulta.dto';

@ApiTags('medicos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Roles(RolUsuario.ADMINISTRADOR)
  @Patch(':id/valor-consulta')
  actualizarValorConsulta(
    @Param('id') id: string,
    @Body() dto: ActualizarValorConsultaDto,
  ) {
    return this.medicosService.actualizarValorConsulta(Number(id), dto);
  }
}