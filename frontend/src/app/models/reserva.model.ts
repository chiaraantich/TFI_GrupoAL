export interface Reserva {
  id: number;
  fecha_hora: string;
  estado: 'ACTIVO' | 'ATENDIDO' | 'AUSENTE' | 'CANCELADO';
  valor_consulta: number;
  paciente_nombre: string;
  medico_nombre: string;
}