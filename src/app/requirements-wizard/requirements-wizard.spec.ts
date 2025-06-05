import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsWizard } from './requirements-wizard';

describe('RequirementsWizard', () => {
  let component: RequirementsWizard;
  let fixture: ComponentFixture<RequirementsWizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementsWizard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequirementsWizard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
