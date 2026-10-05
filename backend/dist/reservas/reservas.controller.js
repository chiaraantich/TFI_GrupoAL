"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reservas_service_1 = require("./reservas.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const enums_1 = require("../common/enums");
const actualizar_estado_reserva_dto_1 = require("./dto/actualizar-estado-reserva.dto");
const crear_reserva_dto_1 = require("./dto/crear-reserva.dto");
let ReservasController = class ReservasController {
    reservasService;
    constructor(reservasService) {
        this.reservasService = reservasService;
    }
    turnosDelMedico(req, fecha) {
        return this.reservasService.turnosDelMedico(req.user.id, fecha);
    }
    marcarEstado(req, id, dto) {
        return this.reservasService.marcarEstado(req.user.id, Number(id), dto);
    }
    crearReserva(req, dto) {
        return this.reservasService.crearReserva(req.user.id, req.user.rol, dto);
    }
    misTurnos(req) {
        return this.reservasService.misTurnos(req.user.id);
    }
    listarTodas() {
        return this.reservasService.listarTodas();
    }
    cancelar(req, id) {
        return this.reservasService.cancelar(req.user.id, req.user.rol, Number(id));
    }
};
exports.ReservasController = ReservasController;
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.RolUsuario.MEDICO),
    (0, common_1.Get)('medico'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('fecha')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "turnosDelMedico", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.RolUsuario.MEDICO),
    (0, common_1.Patch)(':id/estado'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, actualizar_estado_reserva_dto_1.ActualizarEstadoReservaDto]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "marcarEstado", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.RolUsuario.PACIENTE, enums_1.RolUsuario.ADMINISTRADOR),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, crear_reserva_dto_1.CrearReservaDto]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "crearReserva", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.RolUsuario.PACIENTE),
    (0, common_1.Get)('mis-turnos'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "misTurnos", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.RolUsuario.ADMINISTRADOR),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "listarTodas", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.RolUsuario.PACIENTE, enums_1.RolUsuario.ADMINISTRADOR),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "cancelar", null);
exports.ReservasController = ReservasController = __decorate([
    (0, swagger_1.ApiTags)('reservas'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('reservas'),
    __metadata("design:paramtypes", [reservas_service_1.ReservasService])
], ReservasController);
//# sourceMappingURL=reservas.controller.js.map