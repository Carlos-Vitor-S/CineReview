import { TestBed } from '@angular/core/testing';

import { ProductionDetailsService } from './production-details.service';

describe('ProductionDetailsService', () => {
  let service: ProductionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
