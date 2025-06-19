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

  // 决定当前轮到哪个integration | Determine which integration is currently in progress
  stepIndex = 0;

  // 选中的integration key数组，自动过滤顺序 |The selected integration key array, automatically filtering order
  get selectedKeys(): string[] {
    return Object.keys(this.selected).filter(k => this.selected[k]);
  }

  // 当前要填写的integration key |The integration key to be filled in currently
  get currentKey(): string {
    return this.selectedKeys[this.stepIndex];
  }

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {}

  onNext() {
    // 保存所有已填数据 | save all filled data
    const chosen: any = {};
    this.selectedKeys.forEach(key => {
      chosen[key] = this.details[key];
    });
    this.wizardDataService.setModuleDetail('integrations', {
      selected: this.selected,
      details: chosen
    });

    // 如果还有下一个integration，stepIndex++ | If there is another integration, stepIndex++
    if (this.stepIndex < this.selectedKeys.length - 1) {
      this.stepIndex++;
    // 保持在本页面，刷新后只显示下一个integration的表单 | Stay on this page, and after refreshing, only the form for the next integration will be displayed.
    } else {
      // 跳到下一个wizard主模块 | Jump to the next wizard main module
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

  // 切换了勾选项，重置stepIndex | When the check option is toggled, reset stepIndex
  onSelectionChange() {
    this.stepIndex = 0;
  }
}

