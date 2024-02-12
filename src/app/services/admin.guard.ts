import { CanActivateFn, Router } from '@angular/router';
import { LoginStatus } from '../models/loginStatus';
import { inject } from '@angular/core';
import { MessageService } from './message.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const messageService: MessageService = inject(MessageService);

  const loginStatus: LoginStatus = JSON.parse(
    localStorage.getItem('loginStatus') ??
      JSON.stringify({ isLoggedIn: false, id: '', role: '' })
  );

  if (loginStatus.isLoggedIn && loginStatus.role === 'admin') {
    return true;
  } else {
    if (!loginStatus.isLoggedIn) {
      router.navigate(['/login']);
    } else {
      messageService.changeMessage(
        "You don't have previlages to view Admin page"
      );
      router.navigate(['']);
    }
    return false;
  }
};
