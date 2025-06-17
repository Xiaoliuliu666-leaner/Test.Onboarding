import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WizardDataService } from '../wizard-data.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-requirements-wizard',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './requirements-wizard.html',
  styleUrls: ['./requirements-wizard.scss']
})

export class RequirementsWizard implements OnInit {
  stepIndex = 1;

  // 拆分原formData，全部改为独立变量
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
    { key: 'workflows', name: 'Workflows', description: 'Define custom workflow requirements' }
  ];

  constructor(
    private wizardDataService: WizardDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    const stepParam = Number(params['step']);
    this.stepIndex = !isNaN(stepParam) && stepParam > 0 ? stepParam : 1;
    this.restoreCurrentClient(); // Change：初始化同步独立变量
  });
  }

  nextStep() {
    if (this.stepIndex === 1) {
      // 存储全部表单变量到service
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

  // onModuleChange签名加moduleKey参数
  onModuleChange(event: any, moduleKey: string) {
    if (event.target.checked) {
      if (!this.selectedModules.includes(moduleKey)) this.selectedModules.push(moduleKey);
    } else {
      this.selectedModules = this.selectedModules.filter(m => m !== moduleKey);
    }
    this.wizardDataService.setSelectedModules(this.selectedModules);
  }

  submitWizard() {
    // 提交表单，存储全部变量
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

  // 用service还原变量到表单
  restoreCurrentClient() {
    const client = this.wizardDataService.getCurrentClient();
    this.tenant = client.tenant?.tenant || '';
    this.newTenantName = client.tenant?.newTenantName || '';
    this.contactName = client.tenant?.contactName || '';
    this.contactEmail = client.tenant?.contactEmail || '';
    this.contactPhone = client.tenant?.contactPhone || '';
    this.createdBy = client.tenant?.createdBy || '';
    this.configNotes = client.tenant?.configNotes || '';
    this.selectedModules = this.wizardDataService.getSelectedModules();
  }

  checkNewTenant() {
    this.isCreatingNewTenant = this.tenant === '__new__';
  }

  getModuleNameByKey(key: string): string {
    const mod = this.availableModules.find(m => m.key === key);
    return mod ? mod.name : key;
  }

  // 校验方法rewrite，适配独立变量
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
}