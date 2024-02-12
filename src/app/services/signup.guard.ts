import { CanDeactivateFn ,Router} from '@angular/router';
import { inject } from '@angular/core';
import { MessageService } from './message.service';
import { User } from '../models/user';
import { SignupComponent } from '../signup/signup.component';

export const signupGuard: CanDeactivateFn<SignupComponent> = (component, currentRoute, currentState, nextState) => {
  // const router: Router = inject(Router);
  // const messageService: MessageService = inject(MessageService);
 
  component.checkValidation();



  return true;
 
};
