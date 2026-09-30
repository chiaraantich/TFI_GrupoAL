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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../common/enums");
class ReservaResponseDto {
    id;
    fecha_hora;
    estado;
    valor_consulta;
    paciente_nombre;
    medico_nombre;
}
exports.ReservaResponseDto = ReservaResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReservaResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ReservaResponseDto.prototype, "fecha_hora", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.EstadoReserva }),
    __metadata("design:type", String)
], ReservaResponseDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReservaResponseDto.prototype, "valor_consulta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReservaResponseDto.prototype, "paciente_nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReservaResponseDto.prototype, "medico_nombre", void 0);
//# sourceMappingURL=reserva-response.dto.js.map