import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReservasService } from './reservas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolUsuario } from '../common/enums';
import { ActualizarEstadoReservaDto } from './dto/actualizar-estado-reserva.dto';

@ApiTags('reservas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Roles(RolUsuario.MEDICO)
  @Get('medico')
  turnosDelMedico(@Req() req: any, @Query('fecha') fecha: string) {
    return this.reservasService.turnosDelMedico(req.user.id, fecha);
  }

  @Roles(RolUsuario.MEDICO)
  @Patch(':id/estado')
  marcarEstado(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: ActualizarEstadoReservaDto,
  ) {
    return this.reservasService.marcarEstado(req.user.id, Number(id), dto);
  }
}