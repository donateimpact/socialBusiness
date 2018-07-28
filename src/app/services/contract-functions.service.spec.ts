import { TestBed, inject } from '@angular/core/testing';

import { ContractFunctionsService } from './contract-functions.service';

describe('ContractFunctionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractFunctionsService]
    });
  });

  it('should be created', inject([ContractFunctionsService], (service: ContractFunctionsService) => {
    expect(service).toBeTruthy();
  }));
});
