import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultBrochure } from './vault-brochure';

describe('VaultBrochure', () => {
  let component: VaultBrochure;
  let fixture: ComponentFixture<VaultBrochure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultBrochure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaultBrochure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
