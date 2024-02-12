import { CanDeactivateFn } from '@angular/router';

export const shippingGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
