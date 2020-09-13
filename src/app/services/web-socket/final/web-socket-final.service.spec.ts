import { TestBed } from '@angular/core/testing';

import { WebSocketFinalService } from './web-socket-final.service';

describe('WebSocketFinalService', () => {
  let service: WebSocketFinalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketFinalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
