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
exports.Reserva = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../common/enums");
const medico_entity_1 = require("../../medicos/entities/medico.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
let Reserva = class Reserva {
    id;
    medico;
    paciente;
    fecha_hora;
    estado;
    valor_consulta;
};
exports.Reserva = Reserva;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reserva.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medico_entity_1.Medico, (medico) => medico.reservas, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id_medico' }),
    __metadata("design:type", medico_entity_1.Medico)
], Reserva.prototype, "medico", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.reservas, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id_paciente' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Reserva.prototype, "paciente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Reserva.prototype, "fecha_hora", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.EstadoReserva, enumName: 'estados_reservas' }),
    __metadata("design:type", String)
], Reserva.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Reserva.prototype, "valor_consulta", void 0);
exports.Reserva = Reserva = __decorate([
    (0, typeorm_1.Entity)('reservas')
], Reserva);
//# sourceMappingURL=reserva.entity.js.map