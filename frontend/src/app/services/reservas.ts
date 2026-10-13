import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva.model';

export interface Disponibilidad {
  id_medico: number;
  fecha: string;
  horarios: string[];
}

@Injectable({ providedIn: 'root' })
export class ReservasService {
  constructor(private http: HttpClient) {}

  turnosDelMedico(fecha: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`/api/reservas/medico?fecha=${fecha}`);
  }

  marcarEstado(id: number, estado: 'ATENDIDO' | 'AUSENTE'): Observable<Reserva> {
    return this.http.patch<Reserva>(`/api/reservas/${id}/estado`, { estado });
  }

  misTurnos(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>('/api/reservas/mis-turnos');
  }

  listarTodas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>('/api/reservas');
  }

  disponibilidad(idMedico: number, fecha: string): Observable<Disponibilidad> {
    return this.http.get<Disponibilidad>(
      `/api/reservas/disponibilidad?id_medico=${idMedico}&fecha=${fecha}`,
    );
  }

  crearReserva(dto: {
    id_medico: number;
    fecha_hora: string;
    id_paciente?: number;
  }): Observable<Reserva> {
    return this.http.post<Reserva>('/api/reservas', dto);
  }

  cancelar(id: number): Observable<Reserva> {
    return this.http.delete<Reserva>(`/api/reservas/${id}`);
  }
}