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
exports.MedicosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const medicos_service_1 = require("./medicos.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const enums_1 = require("../common/enums");
const actualizar_valor_consulta_dto_1 = require("./dto/actualizar-valor-consulta.dto");
let MedicosController = class MedicosController {
    medicosService;
    constructor(medicosService) {
        this.medicosService = medicosService;
    }
    actualizarValorConsulta(id, dto) {
        return this.medicosService.actualizarValorConsulta(Number(id), dto);
    }
};
exports.MedicosController = MedicosController;
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.RolUsuario.ADMINISTRADOR),
    (0, common_1.Patch)(':id/valor-consulta'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, actualizar_valor_consulta_dto_1.ActualizarValorConsultaDto]),
    __metadata("design:returntype", void 0)
], MedicosController.prototype, "actualizarValorConsulta", null);
exports.MedicosController = MedicosController = __decorate([
    (0, swagger_1.ApiTags)('medicos'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('medicos'),
    __metadata("design:paramtypes", [medicos_service_1.MedicosService])
], MedicosController);
//# sourceMappingURL=medicos.controller.js.map