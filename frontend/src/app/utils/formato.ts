import { Reserva } from '../models/reserva.model';

export function formatoPrecio(valor: number): string {
  return `$ ${valor.toLocaleString('es-AR')}`;
}

export function etiquetaEstado(estado: Reserva['estado']): string {
  const etiquetas: Record<Reserva['estado'], string> = {
    ACTIVO: 'Pendiente',
    ATENDIDO: 'Atendido',
    AUSENTE: 'Ausente',
    CANCELADO: 'Cancelado',
  };
  return etiquetas[estado];
}