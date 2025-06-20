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
  selector: 'app-module-user-reporting',
  templateUrl: './module-user-reporting.component.html',
  imports: [
    FormsModule,
    CommonModule,
    WizardHeadbarComponent,
    WizardSidebarComponent,
    WizardContentOutlineComponent
  ],
  styleUrls: ['./module-user-reporting.component.scss']
})
export class ModuleUserReportingComponent implements OnInit {
  detail = {
    reportTypes: '',
    reportingNotes: '',
    reports: [{ name: '', description: '' }]
  };
  sidebarMenuList: any[] = [];
  activeMenu = 'reporting';

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {}

  ngOnInit() {
    const selectedModules = this.wizardDataService.getSelectedModules();
    this.sidebarMenuList = [
      { label: 'Step 1: Tenant', key: 'Tenant', isStep: true },
      { label: 'Tenant A', key: 'TenantA', isSub: true },
      { label: 'Step 2: Modules', key: 'Modules', isStep: true },
      ...selectedModules.map(key => ({
        label: this.getModuleName(key),
        key,
        isSub: true
      })),
      { label: 'Step 3: Notes', key: 'Notes', isStep: true }
    ];
    const saved = this.wizardDataService.getModuleDetail('reporting');
    if (saved) {
      this.detail = { ...this.detail, ...saved };
    }
    this.activeMenu = 'reporting';
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

  addReport() { this.detail.reports.push({ name: '', description: '' }); }
  removeReport(i: number) { this.detail.reports.splice(i, 1); }

  onNext() {
    this.wizardDataService.setModuleDetail('reporting', this.detail);
    const selected = this.wizardDataService.getSelectedModules();
    const idx = selected.indexOf('reporting');
    const next = idx >= 0 && idx < selected.length - 1 ? selected[idx + 1] : null;
    if (next) {
      this.router.navigate(['/requirements/wizard/module-' + next]);
    } else {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 3 } });
    }
  }

  onPrevious() {
    const selected = this.wizardDataService.getSelectedModules();
    const idx = selected.indexOf('reporting');
    const prev = idx > 0 ? selected[idx - 1] : null;
    if (prev) {
      this.router.navigate(['/requirements/wizard/module-' + prev]);
    } else {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 2 } });
    }
  }

  onSidebarMenuClick(key: string) {
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