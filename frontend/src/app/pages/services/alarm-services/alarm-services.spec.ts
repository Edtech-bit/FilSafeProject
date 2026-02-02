import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmServices } from './alarm-services';

describe('AlarmServices', () => {
  let component: AlarmServices;
  let fixture: ComponentFixture<AlarmServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlarmServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmServices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
