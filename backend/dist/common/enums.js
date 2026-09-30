"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoReserva = exports.RolUsuario = exports.EstadoUsuario = void 0;
var EstadoUsuario;
(function (EstadoUsuario) {
    EstadoUsuario["ACTIVO"] = "ACTIVO";
    EstadoUsuario["BAJA"] = "BAJA";
})(EstadoUsuario || (exports.EstadoUsuario = EstadoUsuario = {}));
var RolUsuario;
(function (RolUsuario) {
    RolUsuario["MEDICO"] = "MEDICO";
    RolUsuario["PACIENTE"] = "PACIENTE";
    RolUsuario["ADMINISTRADOR"] = "ADMINISTRADOR";
})(RolUsuario || (exports.RolUsuario = RolUsuario = {}));
var EstadoReserva;
(function (EstadoReserva) {
    EstadoReserva["ACTIVO"] = "ACTIVO";
    EstadoReserva["ATENDIDO"] = "ATENDIDO";
    EstadoReserva["AUSENTE"] = "AUSENTE";
    EstadoReserva["CANCELADO"] = "CANCELADO";
})(EstadoReserva || (exports.EstadoReserva = EstadoReserva = {}));
//# sourceMappingURL=enums.js.map