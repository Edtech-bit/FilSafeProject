import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  // We check for the exact string 'true'
  if (isLoggedIn === 'true') {
    return true;
  } else {
    // If anything else (null, undefined, 'false'), go to login
    router.navigate(['/login']);
    return false;
  }
};