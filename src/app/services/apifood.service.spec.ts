import { TestBed } from '@angular/core/testing';

import { ApifoodService } from './apifood.service';

describe('ApifoodService', () => {
  let service: ApifoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApifoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
