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
  selector: 'app-module-user-billing',
  templateUrl: './module-user-billing.component.html',
  imports: [
    FormsModule,
    CommonModule,
    WizardHeadbarComponent,
    WizardSidebarComponent,
    WizardContentOutlineComponent
  ],
  styleUrls: ['./module-user-billing.component.scss']
})
export class ModuleUserBillingComponent implements OnInit {
  detail = {
    billingAccount: '',
    billingNotes: '',
    billingCycles: [{ cycleName: '', amount: 0 }],
    paymentMethods: [{ methodName: '', details: '' }]
  };
  sidebarMenuList: any[] = [];
  activeMenu = 'billing';

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
      { label: 'Step 3: Notes', key: 'Notes', isStep: true }
    ];

    const saved = this.wizardDataService.getModuleDetail('billing');
    if (saved) {
      this.detail = { ...this.detail, ...saved };
    }
    this.activeMenu = 'Billing';
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

  addBillingCycle() { this.detail.billingCycles.push({ cycleName: '', amount: 0 }); }
  removeBillingCycle(i: number) { this.detail.billingCycles.splice(i, 1); }
  addPaymentMethod() { this.detail.paymentMethods.push({ methodName: '', details: '' }); }
  removePaymentMethod(i: number) { this.detail.paymentMethods.splice(i, 1); }

  onNext() {
    this.wizardDataService.setModuleDetail('billing', this.detail);
    const selected = this.wizardDataService.getSelectedModules();
    const idx = selected.indexOf('billing');
    const next = idx >= 0 && idx < selected.length - 1 ? selected[idx + 1] : null;
    if (next) {
      this.router.navigate(['/requirements/wizard/module-' + next]);
    } else {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 3 } });
    }
  }

  onPrevious() {
    const selected = this.wizardDataService.getSelectedModules();
    const idx = selected.indexOf('billing');
    const prev = idx > 0 ? selected[idx - 1] : null;
    if (prev) {
      this.router.navigate(['/requirements/wizard/module-' + prev]);
    } else {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 2 } });
    }
  }

  /** 关键补充：Sidebar点击跳转 **/
  onSidebarMenuClick(key: string) {
    console.log('[Sidebar click]', key);
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