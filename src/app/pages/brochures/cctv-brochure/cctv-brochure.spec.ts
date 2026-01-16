import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CctvBrochure } from './cctv-brochure';

describe('CctvBrochure', () => {
  let component: CctvBrochure;
  let fixture: ComponentFixture<CctvBrochure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CctvBrochure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CctvBrochure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
