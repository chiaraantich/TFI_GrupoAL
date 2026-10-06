import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.estaLogueado()) {
    router.navigate(['/login']);
    return false;
  }

  const rolesPermitidos = route.data?.['roles'] as string[] | undefined;
  if (rolesPermitidos && rolesPermitidos.length > 0) {
    const usuario = authService.getUsuario();
    if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
      router.navigate(['/login']);
      return false;
    }
  }

  return true;
};