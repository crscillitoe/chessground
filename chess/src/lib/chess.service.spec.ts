import { TestBed } from '@angular/core/testing';

import { ChessService } from './chess.service';

describe('ChessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChessService = TestBed.get(ChessService);
    expect(service).toBeTruthy();
  });
});
