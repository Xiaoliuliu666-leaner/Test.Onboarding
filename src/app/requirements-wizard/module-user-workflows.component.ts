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
  selector: 'app-module-user-workflows',
  templateUrl: './module-user-workflows.component.html',
  imports: [
    FormsModule,
    CommonModule,
    WizardHeadbarComponent,
    WizardSidebarComponent,
    WizardContentOutlineComponent
  ],
  styleUrls: ['./module-user-workflows.component.scss']
})
export class ModuleUserWorkflowsComponent implements OnInit {
  workflows: Array<{ description: string }> = [];
  sidebarMenuList: any[] = [];
  activeMenu = 'workflows';

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {}

  ngOnInit() {
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
      { label: 'Workflows', key: 'Workflows', isStep: true },
      { label: 'Step 3: Notes', key: 'Notes', isStep: true }
    ];

    const saved = this.wizardDataService.getModuleDetail('Workflows');
    if (saved) {
      this.workflows = { ...this.workflows, ...saved };
    }
    this.activeMenu = 'Workflows';
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

  onAddWorkflow() { this.workflows.push({ description: '' }); }
  onRemoveWorkflow(idx: number) { this.workflows.splice(idx, 1); }

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

  onPrevious() {
    const selected = this.wizardDataService.getSelectedModules();
    const idx = selected.indexOf('workflows');
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