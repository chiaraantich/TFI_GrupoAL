import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicoInfo } from '../models/medico.model';

@Injectable({ providedIn: 'root' })
export class MedicosService {
  constructor(private http: HttpClient) {}

  listar(): Observable<MedicoInfo[]> {
    return this.http.get<MedicoInfo[]>('/api/medicos');
  }
}