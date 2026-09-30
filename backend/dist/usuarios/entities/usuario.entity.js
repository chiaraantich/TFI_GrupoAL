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
exports.Usuario = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../common/enums");
const medico_entity_1 = require("../../medicos/entities/medico.entity");
const reserva_entity_1 = require("../../reservas/entities/reserva.entity");
let Usuario = class Usuario {
    id;
    documento;
    apellidos;
    nombres;
    email;
    clave;
    estado;
    rol;
    medico;
    reservas;
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "documento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Usuario.prototype, "apellidos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Usuario.prototype, "nombres", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Usuario.prototype, "clave", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.EstadoUsuario, enumName: 'estados_usuarios' }),
    __metadata("design:type", String)
], Usuario.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.RolUsuario, enumName: 'roles_usuarios' }),
    __metadata("design:type", String)
], Usuario.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => medico_entity_1.Medico, (medico) => medico.usuario),
    __metadata("design:type", medico_entity_1.Medico)
], Usuario.prototype, "medico", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reserva_entity_1.Reserva, (reserva) => reserva.paciente),
    __metadata("design:type", Array)
], Usuario.prototype, "reservas", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)('usuarios')
], Usuario);
//# sourceMappingURL=usuario.entity.js.map