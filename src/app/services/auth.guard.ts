import { CanActivateFn, Router } from '@angular/router';
import { LoginStatus } from '../models/loginStatus';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const loginStatus: LoginStatus = JSON.parse(
    localStorage.getItem('loginStatus') ??
      JSON.stringify({ isLoggedIn: false, id: '', role: '' })
  );
  if (loginStatus.isLoggedIn) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
