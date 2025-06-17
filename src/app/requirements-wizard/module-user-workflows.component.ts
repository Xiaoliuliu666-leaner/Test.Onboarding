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
  selector: 'app-module-user-workflows',
  templateUrl: './module-user-workflows.component.html',
  imports: [FormsModule, CommonModule, WizardHeadbarComponent, WizardSidebarComponent, WizardContentOutlineComponent],
  styleUrls: ['./module-user-workflows.component.scss']
})
export class ModuleUserWorkflowsComponent {
  workflows: Array<{ description: string }> = [];

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {
    // 如果有已保存的数据（比如返回上一步再进来）
    const saved = this.wizardDataService.getModuleDetail('workflows');
    if (saved && Array.isArray(saved.workflows)) {
      this.workflows = saved.workflows;
    }
  }

  onAddWorkflow() {
    this.workflows.push({ description: '' });
  }

  onRemoveWorkflow(idx: number) {
    this.workflows.splice(idx, 1);
  }

  onNext() {
    this.wizardDataService.setModuleDetail('workflows', { workflows: this.workflows });
    const selected = this.wizardDataService.getSelectedModules();
    const idx = selected.indexOf('workflows');
    const next = idx >= 0 && idx < selected.length - 1 ? selected[idx + 1] : null;
    if (next) {
      this.router.navigate(['/requirements/wizard/module-' + next]);
    } else {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 3 } });
    }
  }
}
