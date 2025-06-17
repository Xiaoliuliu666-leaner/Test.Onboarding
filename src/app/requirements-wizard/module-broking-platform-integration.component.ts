import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WizardDataService } from '../wizard-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WizardHeadbarComponent } from '../components/wizard-headbar/wizard-headbar';
import { WizardSidebarComponent } from '../components/wizard-sidebar/wizard-sidebar';
import { WizardContentOutlineComponent } from '../components/wizard-content-outline/wizard-content-outline';

@Component({
  standalone: true,
  selector: 'app-module-broking-platform-integration',
  templateUrl: './module-broking-platform-integration.component.html',
  imports: [FormsModule, CommonModule, WizardHeadbarComponent, WizardSidebarComponent, WizardContentOutlineComponent],
  styleUrls: ['./module-broking-platform-integration.component.scss']
})
export class ModuleBrokingPlatformIntegrationComponent {
  platforms = [
    { value: 'winbeat', label: 'WinBEAT' },
    { value: 'insight', label: 'Insight' },
    { value: 'officetech', label: 'OfficeTech' }
  ];
  selectedPlatform = '';
  detail: any = {};

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {}

  onNext() {
    this.wizardDataService.setModuleDetail('broking-platform-integration', {
      selectedPlatform: this.selectedPlatform,
      detail: this.detail
    });
    const selected = this.wizardDataService.getSelectedModules();
    const idx = selected.indexOf('broking-platform-integration');
    const next = idx >= 0 && idx < selected.length - 1 ? selected[idx + 1] : null;
    if (next) {
      this.router.navigate(['/requirements/wizard/module-' + next]);
    } else {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 3 } });
    }
  }
}

