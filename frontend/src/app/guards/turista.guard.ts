import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const turistaGuard: CanActivateFn = (route, state) => {
 const router = inject(Router);
  
  const raw = localStorage.getItem('ulogovan');
  if (!raw) {
    router.navigate(['/login']);
    return false;
  }
  
  const user = JSON.parse(raw);
  if (user.type !== 'turista') {
    router.navigate(['/login']);
    return false;
  }
  
  return true;
};
