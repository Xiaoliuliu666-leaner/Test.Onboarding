import { Component, OnInit } from '@angular/core';
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
  imports: [
    FormsModule,
    CommonModule,
    WizardHeadbarComponent,
    WizardSidebarComponent,
    WizardContentOutlineComponent
  ],
  styleUrls: ['./module-integrations.component.scss']
})
export class ModuleIntegrationsComponent implements OnInit {
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

  stepIndex = 0;
  sidebarMenuList: any[] = [];
  activeMenu = 'Integrations';

  get selectedKeys(): string[] {
    return Object.keys(this.selected).filter(k => this.selected[k]);
  }
  get currentKey(): string {
    return this.selectedKeys[this.stepIndex];
  }

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {}

  ngOnInit() {
    // 加载侧边栏菜单 Loading Sidebar Menu
    const client = this.wizardDataService.getCurrentClient() || {};
    const tenant = client.tenant?.tenant || '';
    const newTenantName = client.tenant?.newTenantName || '';
    const contactEmail = client.tenant?.contactEmail || '';
    const contactPhone = client.tenant?.contactPhone || '';
    const selectedModules = this.wizardDataService.getSelectedModules();

    this.sidebarMenuList = [
      { label: 'Step 1: Tenant', key: 'Tenant', isStep: true },
      { label: tenant === '__new__' ? newTenantName : tenant, key: 'TenantA', isSub: true },
      ...(contactEmail ? [{ label: contactEmail, key: 'ContactEmail', isSub: true }] : []),
      ...(contactPhone ? [{ label: contactPhone, key: 'ContactPhone', isSub: true }] : []),
      { label: 'Step 2: Modules', key: 'Modules', isStep: true },
      ...selectedModules.map((key: string) => ({
        label: this.getModuleName(key),
        key: this.getModuleName(key),
        isSub: true
      })),
      { label: 'Integrations', key: 'Integrations', isStep: true },
      { label: 'Step 3: Notes', key: 'Notes', isStep: true }
    ];

    // 回填数据 Backfill data
    const saved = this.wizardDataService.getModuleDetail('integrations');
    if (saved && saved.selected) {
      this.selected = { ...this.selected, ...saved.selected };
    }
    if (saved && saved.details) {
      Object.keys(this.details).forEach(k => {
        if (saved.details[k]) {
          this.details[k] = { ...this.details[k], ...saved.details[k] };
        }
      });
    }
  }

  getModuleName(key: string): string {
    const map: Record<string, string> = {
      'user-management': 'User Management',
      'billing': 'Billing',
      'reporting': 'Reporting',
      'support': 'Support',
      'workflows': 'Workflows',
      'integrations': 'Integrations'
    };
    return map[key] || key;
  }

  onNext() {
    // 保存数据 Save data
    const chosen: any = {};
    this.selectedKeys.forEach(key => { chosen[key] = this.details[key]; });
    this.wizardDataService.setModuleDetail('integrations', {
      selected: this.selected,
      details: chosen
    });

    if (this.stepIndex < this.selectedKeys.length - 1) {
      this.stepIndex++;
    } else {
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

  onSelectionChange() { this.stepIndex = 0; }

  onPrevious() {
    if (this.stepIndex > 0) {
      this.stepIndex--;
    } else {
      const selectedModules = this.wizardDataService.getSelectedModules();
      const idx = selectedModules.indexOf('integrations');
      const prev = idx > 0 ? selectedModules[idx - 1] : null;
      if (prev) {
        this.router.navigate(['/requirements/wizard/module-' + prev]);
      } else {
        this.router.navigate(['/requirements/wizard'], { queryParams: { step: 2 } });
      }
    }
  }

  onSidebarMenuClick(key: string) {
    // 跳转到对应模块页面 Jump to corresponding module page
    const moduleMap: { [k: string]: string } = {
      'User Management': 'user-management',
      'Reporting': 'reporting',
      'Billing': 'billing',
      'Support': 'support',
      'Workflows': 'workflows',
      'Integrations': 'integrations'
    };

    if (moduleMap[key]) {
      this.router.navigate(['/requirements/wizard/module-' + moduleMap[key]]);
    } else if (key === 'Tenant') {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 1 } });
    } else if (key === 'Modules') {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 2 } });
    } else if (key === 'Notes') {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 3 } });
    }
  }
}