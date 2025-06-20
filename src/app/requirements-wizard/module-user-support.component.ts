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
  selector: 'app-module-user-support',
  templateUrl: './module-user-support.component.html',
  imports: [
    FormsModule,
    CommonModule,
    WizardHeadbarComponent,
    WizardSidebarComponent,
    WizardContentOutlineComponent
  ],
  styleUrls: ['./module-user-support.component.scss']
})
export class ModuleUserSupportComponent implements OnInit {
  detail = {
    supportLevel: '',
    supportNotes: '',
    levelRequired: 1
  };
  sidebarMenuList: any[] = [];
  activeMenu = 'support';

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
    const saved = this.wizardDataService.getModuleDetail('support');
    if (saved) {
      this.detail = { ...this.detail, ...saved };
    }
    this.activeMenu = 'support';
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
    this.wizardDataService.setModuleDetail('support', this.detail);
    const selected = this.wizardDataService.getSelectedModules();
    const idx = selected.indexOf('support');
    const next = idx >= 0 && idx < selected.length - 1 ? selected[idx + 1] : null;
    if (next) {
      this.router.navigate(['/requirements/wizard/module-' + next]);
    } else {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 3 } });
    }
  }

  onPrevious() {
    const selected = this.wizardDataService.getSelectedModules();
    const idx = selected.indexOf('support');
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