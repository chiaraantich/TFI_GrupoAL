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
exports.ReservasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reserva_entity_1 = require("./entities/reserva.entity");
const medico_entity_1 = require("../medicos/entities/medico.entity");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const enums_1 = require("../common/enums");
let ReservasService = class ReservasService {
    reservasRepo;
    medicosRepo;
    usuariosRepo;
    constructor(reservasRepo, medicosRepo, usuariosRepo) {
        this.reservasRepo = reservasRepo;
        this.medicosRepo = medicosRepo;
        this.usuariosRepo = usuariosRepo;
    }
    aResponseDto(reserva) {
        return {
            id: reserva.id,
            fecha_hora: reserva.fecha_hora,
            estado: reserva.estado,
            valor_consulta: reserva.valor_consulta,
            paciente_nombre: `${reserva.paciente.nombres} ${reserva.paciente.apellidos}`,
            medico_nombre: `${reserva.medico.usuario.nombres} ${reserva.medico.usuario.apellidos}`,
        };
    }
    async turnosDelMedico(idUsuarioLogueado, fecha) {
        const medico = await this.medicosRepo.findOne({
            where: { usuario: { id: idUsuarioLogueado } },
        });
        if (!medico) {
            throw new common_1.NotFoundException('No se encontró un médico para este usuario');
        }
        const inicio = new Date(`${fecha}T00:00:00`);
        const fin = new Date(`${fecha}T23:59:59`);
        const reservas = await this.reservasRepo.find({
            where: { medico: { id: medico.id }, fecha_hora: (0, typeorm_2.Between)(inicio, fin) },
            relations: { paciente: true, medico: { usuario: true } },
            order: { fecha_hora: 'ASC' },
        });
        return reservas.map((r) => this.aResponseDto(r));
    }
    async marcarEstado(idUsuarioLogueado, reservaId, dto) {
        const medico = await this.medicosRepo.findOne({
            where: { usuario: { id: idUsuarioLogueado } },
        });
        if (!medico) {
            throw new common_1.NotFoundException('No se encontró un médico para este usuario');
        }
        const reserva = await this.reservasRepo.findOne({
            where: { id: reservaId },
            relations: { medico: { usuario: true }, paciente: true },
        });
        if (!reserva) {
            throw new common_1.NotFoundException('Turno no encontrado');
        }
        if (reserva.medico.id !== medico.id) {
            throw new common_1.ForbiddenException('No puedes modificar turnos de otro médico');
        }
        if (reserva.estado !== enums_1.EstadoReserva.ACTIVO) {
            throw new common_1.BadRequestException('Solo se puede modificar un turno en estado ACTIVO');
        }
        reserva.estado = dto.estado;
        const guardada = await this.reservasRepo.save(reserva);
        return this.aResponseDto(guardada);
    }
    async crearReserva(idUsuarioLogueado, rolLogueado, dto) {
        let idPaciente;
        if (rolLogueado === enums_1.RolUsuario.ADMINISTRADOR) {
            if (!dto.id_paciente) {
                throw new common_1.BadRequestException('El admin debe indicar id_paciente');
            }
            idPaciente = dto.id_paciente;
        }
        else {
            idPaciente = idUsuarioLogueado;
        }
        const paciente = await this.usuariosRepo.findOne({ where: { id: idPaciente } });
        if (!paciente) {
            throw new common_1.NotFoundException('Paciente no encontrado');
        }
        const medico = await this.medicosRepo.findOne({
            where: { id: dto.id_medico },
            relations: { usuario: true },
        });
        if (!medico) {
            throw new common_1.NotFoundException('Médico no encontrado');
        }
        const fecha = new Date(dto.fecha_hora);
        if (isNaN(fecha.getTime())) {
            throw new common_1.BadRequestException('Fecha y hora inválidas');
        }
        if (fecha.getMinutes() !== 0 || fecha.getSeconds() !== 0) {
            throw new common_1.BadRequestException('Los turnos son en horas en punto');
        }
        const hora = fecha.getHours();
        if (hora < 8 || hora > 15) {
            throw new common_1.BadRequestException('El horario de atención es de 8 a 16 hs');
        }
        const ahora = new Date();
        if (fecha.getTime() < ahora.getTime()) {
            throw new common_1.BadRequestException('No se puede reservar un turno en el pasado');
        }
        const limite = new Date();
        limite.setDate(limite.getDate() + 30);
        if (fecha.getTime() > limite.getTime()) {
            throw new common_1.BadRequestException('Las reservas se pueden hacer con un máximo de 30 días de anticipación');
        }
        const existente = await this.reservasRepo.findOne({
            where: {
                medico: { id: medico.id },
                fecha_hora: fecha,
                estado: enums_1.EstadoReserva.ACTIVO,
            },
        });
        if (existente) {
            throw new common_1.BadRequestException('Ese horario ya está ocupado para el médico');
        }
        const nuevaReserva = this.reservasRepo.create({
            medico,
            paciente,
            fecha_hora: fecha,
            estado: enums_1.EstadoReserva.ACTIVO,
            valor_consulta: medico.valor_consulta,
        });
        const guardada = await this.reservasRepo.save(nuevaReserva);
        const completa = await this.reservasRepo.findOne({
            where: { id: guardada.id },
            relations: { paciente: true, medico: { usuario: true } },
        });
        return this.aResponseDto(completa);
    }
};
exports.ReservasService = ReservasService;
exports.ReservasService = ReservasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reserva_entity_1.Reserva)),
    __param(1, (0, typeorm_1.InjectRepository)(medico_entity_1.Medico)),
    __param(2, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReservasService);
//# sourceMappingURL=reservas.service.js.map