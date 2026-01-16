import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmBrochure } from './alarm-brochure';

describe('AlarmBrochure', () => {
  let component: AlarmBrochure;
  let fixture: ComponentFixture<AlarmBrochure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlarmBrochure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmBrochure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
