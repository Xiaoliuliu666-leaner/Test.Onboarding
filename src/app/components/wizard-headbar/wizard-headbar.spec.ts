import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardHeadbarComponent } from './wizard-headbar';

describe('WizardHeadbar', () => {
  let component: WizardHeadbarComponent;
  let fixture: ComponentFixture<WizardHeadbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardHeadbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardHeadbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
