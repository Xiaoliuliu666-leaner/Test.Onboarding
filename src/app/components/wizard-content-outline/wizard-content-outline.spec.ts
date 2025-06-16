import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardContentOutlineComponent } from './wizard-content-outline';

describe('WizardContentOutline', () => {
  let component: WizardContentOutlineComponent;
  let fixture: ComponentFixture<WizardContentOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardContentOutlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardContentOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
