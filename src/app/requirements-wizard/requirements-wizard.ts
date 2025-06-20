import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WizardDataService } from '../wizard-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { WizardSidebarComponent } from '../components/wizard-sidebar/wizard-sidebar';

@Component({
  standalone: true,
  selector: 'app-requirements-wizard',
  imports: [FormsModule, CommonModule, RouterModule, WizardSidebarComponent],
  templateUrl: './requirements-wizard.html',
  styleUrls: ['./requirements-wizard.scss']
})
export class RequirementsWizard implements OnInit {
  stepIndex = 1;

  tenant: string = '';
  newTenantName: string = '';
  contactName: string = '';
  contactEmail: string = '';
  contactPhone: string = '';
  createdBy: string = '';
  configNotes: string = '';
  selectedModules: string[] = [];
  isCreatingNewTenant = false;

  tenants = ['Tenant A', 'Tenant B', 'Tenant C'];
  availableModules = [
    { key: 'user-management', name: 'User Management', description: 'Manage users and roles' },
    { key: 'reporting', name: 'Reporting', description: 'Access various reports and dashboards' },
    { key: 'billing', name: 'Billing', description: 'Manage invoicing, payment processing, and subscription plans' },
    { key: 'support', name: 'Support', description: 'Provide customer assistance and issue resolution services' },
    { key: 'workflows', name: 'Workflows', description: 'Define custom workflow requirements' },
    { key: 'integrations', name: 'Integrations', description: 'Setup Broking Platform and Document Management integrations'},
  ];

  // 用于sidebar
  get menuList() {
    // 步骤和选中的模块动态拼接
    return [
      { label: 'Step 1: Tenant', key: 'Tenant', isStep: true },
      ...(this.tenant ? [
        { label: this.tenant === '__new__' ? this.newTenantName : this.tenant, key: 'TenantInfo', isSub: true },
        ...(this.contactEmail ? [{ label: this.contactEmail, key: 'ContactEmail', isSub: true }] : []),
        ...(this.contactPhone ? [{ label: this.contactPhone, key: 'ContactPhone', isSub: true }] : [])
      ] : []),
      { label: 'Step 2: Modules', key: 'Modules', isStep: true },
      ...(this.selectedModules.length ? this.selectedModules.map(k => ({
        label: this.getModuleNameByKey(k),
        key: k,
        isSub: true
      })) : []),
      ...(this.selectedModules.includes('integrations')
        ? [{ label: 'Integrations', key: 'Integrations', isStep: true }] : []),
      { label: 'Step 3: Notes', key: 'Notes', isStep: true }
    ];
  }
  get integrationSteps() {
    return this.selectedModules.includes('integrations')
      ? ['winbeat', 'insight', 'officetech']
      : [];
  }

  // 当前高亮key，和stepIndex关联
  get activeMenu() {
    switch (this.stepIndex) {
      case 1: return 'Tenant';
      case 2: return 'Modules';
      case 3: return 'Notes';
      default: return '';
    }
  }

  constructor(
    private wizardDataService: WizardDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const stepParam = Number(params['step']);
      this.stepIndex = !isNaN(stepParam) && stepParam > 0 ? stepParam : 1;
      this.restoreCurrentClient();
    });
  }

  restoreCurrentClient() {
    const client = this.wizardDataService.getCurrentClient() || {};
    this.tenant = client.tenant?.tenant || '';
    this.newTenantName = client.tenant?.newTenantName || '';
    this.contactName = client.tenant?.contactName || '';
    this.contactEmail = client.tenant?.contactEmail || '';
    this.contactPhone = client.tenant?.contactPhone || '';
    this.createdBy = client.tenant?.createdBy || '';
    this.configNotes = client.tenant?.configNotes || '';
    this.selectedModules = client.modules ? Object.keys(client.modules) : [];
    this.isCreatingNewTenant = this.tenant === '__new__';
  }

  nextStep() {
    if (this.stepIndex === 1) {
      this.wizardDataService.setTenantInfo({
        tenant: this.tenant,
        newTenantName: this.newTenantName,
        contactName: this.contactName,
        contactEmail: this.contactEmail,
        contactPhone: this.contactPhone,
        createdBy: this.createdBy,
        configNotes: this.configNotes
      });
    }
    if (this.stepIndex === 2) {
      this.wizardDataService.setSelectedModules(this.selectedModules);
      if (this.selectedModules.length > 0) {
        this.router.navigate([`/requirements/wizard/module-${this.selectedModules[0]}`]);
        return;
      }
    }
    if (this.stepIndex < 3) this.stepIndex++;
  }

  previousStep() {
    if (this.stepIndex > 1) this.stepIndex--;
  }

  onModuleChange(event: any, moduleKey: string) {
    if (event.target.checked) {
      if (!this.selectedModules.includes(moduleKey)) this.selectedModules.push(moduleKey);
    } else {
      this.selectedModules = this.selectedModules.filter(m => m !== moduleKey);
    }
    this.wizardDataService.setSelectedModules(this.selectedModules);
  }

  submitWizard() {
    this.wizardDataService.setTenantInfo({
      tenant: this.tenant,
      newTenantName: this.newTenantName,
      contactName: this.contactName,
      contactEmail: this.contactEmail,
      contactPhone: this.contactPhone,
      createdBy: this.createdBy,
      configNotes: this.configNotes
    });
    this.wizardDataService.setSelectedModules(this.selectedModules);
    this.wizardDataService.saveCurrentClient();
    this.wizardDataService.resetCurrentClient();
    this.router.navigate(['/']);
  }

  checkNewTenant() {
    this.isCreatingNewTenant = this.tenant === '__new__';
  }

  getModuleNameByKey(key: string): string {
    const mod = this.availableModules.find(m => m.key === key);
    return mod ? mod.name : key;
  }

  isStepValid(): boolean {
    switch (this.stepIndex) {
      case 1:
        if (this.tenant === '__new__') {
          return this.newTenantName.trim().length > 0;
        }
        return this.tenant !== '';
      case 2:
        return this.selectedModules.length > 0;
      case 3:
        return this.configNotes.trim().length >= 10;
      default:
        return true;
    }
  }

  onPreviousStepFromNotes() {
    const selected = this.wizardDataService.getSelectedModules();
    if (selected && selected.length > 0) {
      const lastModule = selected[selected.length - 1];
      this.router.navigate(['/requirements/wizard/module-' + lastModule]);
    } else {
      this.stepIndex = 2;
    }
  }

  // 侧边栏菜单点击跳转
  onSidebarMenuClick(key: string) {
    // 支持所有模块的跳转
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
      this.stepIndex = 1;
    } else if (key === 'Modules') {
      this.stepIndex = 2;
    } else if (key === 'Notes') {
      this.stepIndex = 3;
    }
  }
}