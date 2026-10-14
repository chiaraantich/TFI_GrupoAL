import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PacienteInfo } from '../models/paciente.model';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  constructor(private http: HttpClient) {}

  listarPacientes(): Observable<PacienteInfo[]> {
    return this.http.get<PacienteInfo[]>('/api/usuarios/pacientes');
  }
}