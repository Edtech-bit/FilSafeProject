import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vaults } from './vaults';

describe('Vaults', () => {
  let component: Vaults;
  let fixture: ComponentFixture<Vaults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vaults]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vaults);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
