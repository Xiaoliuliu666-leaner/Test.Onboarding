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
  selector: 'app-module-user-management',
  templateUrl: './module-user-management.component.html',
  imports: [FormsModule,CommonModule,WizardHeadbarComponent,WizardSidebarComponent,WizardContentOutlineComponent],
  styleUrls: ['./module-user-management.component.scss']
})
export class ModuleUserManagementComponent implements OnInit {
  roles = ['Organisation Admins', 'Brokers'];
  usersByRole: { [role: string]: Array<{ Name: string, Email: string, Phone: string }> } = {};
  detail = { adminCount: 1, notes: '' };

  sidebarMenuList: any[] = [];
  activeMenu = 'user-management';

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {
    this.roles.forEach(role => { this.usersByRole[role] = []; });
  }

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
    this.activeMenu = 'user-management';
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

  onAddUser(role: string) { this.usersByRole[role].push({ Name: '', Email: '', Phone: '' }); }
  onRemoveUser(role: string, idx: number) { this.usersByRole[role].splice(idx, 1); }

  onNext() {
    this.wizardDataService.setModuleDetail('user-management', { usersByRole: this.usersByRole, detail: this.detail });
    const selected = this.wizardDataService.getSelectedModules();
    const idx = selected.indexOf('user-management');
    const next = idx >= 0 && idx < selected.length - 1 ? selected[idx + 1] : null;
    if (next) {
      this.router.navigate(['/requirements/wizard/module-' + next]);
    } else {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 3 } });
    }
  }

  onPrevious() {
    const selected = this.wizardDataService.getSelectedModules();
    const idx = selected.indexOf('user-management');
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