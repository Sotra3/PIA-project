import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const raw = localStorage.getItem('ulogovan');
  if (!raw) {
    router.navigate(['/adminlogin']);
    return false;
  }
  
  const user = JSON.parse(raw);
  if (user.type !== 'admin') {
    router.navigate(['/adminlogin']);
    return false;
  }
  
  return true;
};
