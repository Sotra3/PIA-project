import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const vlasnikGuard: CanActivateFn = (route, state) => {
const router = inject(Router);
  
  const raw = localStorage.getItem('ulogovan');
  if (!raw) {
    router.navigate(['/login']);
    return false;
  }
  
  const user = JSON.parse(raw);
  if (user.type != 'vlasnik') {
    router.navigate(['/login']);
    return false;
  }
  
  return true;
};
