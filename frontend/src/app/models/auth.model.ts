export interface LoginRequest {
  documento: string;
  clave: string;
}

export interface LoginResponse {
  access_token: string;
  usuario: {
    id: number;
    nombres: string;
    apellidos: string;
    rol: 'MEDICO' | 'PACIENTE' | 'ADMINISTRADOR';
  };
}