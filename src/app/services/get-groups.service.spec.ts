import { TestBed } from '@angular/core/testing';

import { GetGroupsService } from './get-groups.service';

describe('GetGroupsService', () => {
  let service: GetGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
