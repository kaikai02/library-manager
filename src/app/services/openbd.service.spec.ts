import { TestBed } from '@angular/core/testing';

import { OpenbdService } from './openbd.service';

describe('OpenbdService', () => {
  let service: OpenbdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenbdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
