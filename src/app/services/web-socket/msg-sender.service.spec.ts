import { TestBed } from '@angular/core/testing';

import { MsgSenderService } from './msg-sender.service';

describe('MsgSenderService', () => {
  let service: MsgSenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsgSenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
