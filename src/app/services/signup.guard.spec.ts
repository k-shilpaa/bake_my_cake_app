import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { signupGuard } from './signup.guard';

describe('signupGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => signupGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
