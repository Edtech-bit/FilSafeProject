import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CctvServices } from './cctv-services';

describe('CctvServices', () => {
  let component: CctvServices;
  let fixture: ComponentFixture<CctvServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CctvServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CctvServices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
