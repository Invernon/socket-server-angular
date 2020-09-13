import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UwsConnectionComponent } from './uws-connection.component';

describe('UwsConnectionComponent', () => {
  let component: UwsConnectionComponent;
  let fixture: ComponentFixture<UwsConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UwsConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UwsConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
