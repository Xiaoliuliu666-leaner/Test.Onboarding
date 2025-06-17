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
  selector: 'app-module-integrations',
  templateUrl: './module-integrations.component.html',
  imports: [FormsModule, CommonModule, WizardHeadbarComponent, WizardSidebarComponent, WizardContentOutlineComponent],
  styleUrls: ['./module-integrations.component.scss']
})
export class ModuleIntegrationsComponent {
  selected: { [key: string]: boolean } = {
  winbeat: false,
  insight: false,
  officetech: false
};

details: { [key: string]: any } = {
  winbeat: { hostingProvider: '', connectionInfo: '' },
  insight: { ledger: '', notes: '' },
  officetech: { hostingProvider: '', sqlConnection: '', fileStorage: '' }
};

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {}

  onNext() {
    // 只存选中的详情
    const chosen: any = {};
    Object.keys(this.selected).forEach(key => {
      if (this.selected[key]) {
        chosen[key] = this.details[key];
      }
    });
    this.wizardDataService.setModuleDetail('integrations', {
      selected: this.selected,
      details: chosen
    });

    // 正常流程跳转
    const selectedModules = this.wizardDataService.getSelectedModules();
    const idx = selectedModules.indexOf('integrations');
    const next = idx >= 0 && idx < selectedModules.length - 1 ? selectedModules[idx + 1] : null;
    if (next) {
      this.router.navigate(['/requirements/wizard/module-' + next]);
    } else {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 3 } });
    }
  }
}

