import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WizardSidebarComponent } from './wizard-sidebar';

describe('WizardSidebar', () => {
  let component: WizardSidebarComponent;
  let fixture: ComponentFixture<WizardSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
