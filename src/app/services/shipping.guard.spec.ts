import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { shippingGuard } from './shipping.guard';

describe('shippingGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => shippingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
