import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  documento = '';
  clave = '';
  error = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.error = '';
    this.cargando = true;

    this.authService.login({ documento: this.documento, clave: this.clave }).subscribe({
      next: (res) => {
        this.cargando = false;
        switch (res.usuario.rol) {
          case 'MEDICO':
            this.router.navigate(['/medico']);
            break;
          case 'PACIENTE':
            this.router.navigate(['/paciente']);
            break;
          case 'ADMINISTRADOR':
            this.router.navigate(['/admin']);
            break;
        }
      },
      error: () => {
        this.cargando = false;
        this.error = 'Documento o clave incorrectos, o usuario no activo';
      },
    });
  }
}