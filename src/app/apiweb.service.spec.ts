import { TestBed } from '@angular/core/testing';

import { ApiwebService } from './apiweb.service';

describe('ApiwebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiwebService = TestBed.get(ApiwebService);
    expect(service).toBeTruthy();
  });
});
