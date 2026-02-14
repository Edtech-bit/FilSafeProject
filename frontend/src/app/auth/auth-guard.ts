import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Check if we are running in the browser (important for live servers)
  const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;

  if (isLoggedIn === 'true') {
    return true;
  } else {
    // Save the URL they were trying to hit so we can redirect them back after login
    router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
};