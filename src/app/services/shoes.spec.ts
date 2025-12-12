import { TestBed } from '@angular/core/testing';

import { Shoes } from './shoes';

describe('Shoes', () => {
  let service: Shoes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Shoes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
