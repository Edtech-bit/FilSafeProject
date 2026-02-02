import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultServices } from './vault-services';

describe('VaultServices', () => {
  let component: VaultServices;
  let fixture: ComponentFixture<VaultServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaultServices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
