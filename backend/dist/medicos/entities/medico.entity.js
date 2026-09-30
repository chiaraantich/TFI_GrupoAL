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
exports.Medico = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const reserva_entity_1 = require("../../reservas/entities/reserva.entity");
let Medico = class Medico {
    id;
    usuario;
    matricula;
    valor_consulta;
    reservas;
};
exports.Medico = Medico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Medico.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.medico, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Medico.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Medico.prototype, "matricula", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Medico.prototype, "valor_consulta", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reserva_entity_1.Reserva, (reserva) => reserva.medico),
    __metadata("design:type", Array)
], Medico.prototype, "reservas", void 0);
exports.Medico = Medico = __decorate([
    (0, typeorm_1.Entity)('medicos')
], Medico);
//# sourceMappingURL=medico.entity.js.map