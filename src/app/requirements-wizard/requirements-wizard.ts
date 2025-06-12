import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WizardDataService } from '../wizard-data.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-requirements-wizard',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './requirements-wizard.html',
  styleUrls: ['./requirements-wizard.scss']
})

export class RequirementsWizard {
  stepIndex: number = 1;

constructor(
  private wizardDataService: WizardDataService,
  private router: Router,
  private route: ActivatedRoute
){
  this.route.queryParams.subscribe(params => {
    const stepParam = Number(params['step']);
    this.stepIndex = !isNaN(stepParam) && stepParam > 0 ? stepParam : 1;
  });
}
  

  formData: {
  tenant: string;
  newTenantName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  modules: string[];
  configNotes: string;
  createdBy: string
  moduleDetails?: any;
  [key: string]: any;
} = {
  tenant: '',
  newTenantName: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  modules: [],
  configNotes: '',
  createdBy: ''
};

  tenants = ['Tenant A', 'Tenant B', 'Tenant C'];

  availableModules = [
  { key: 'user-management', name: 'User Management', description: 'Manage users and roles' },
  { key: 'reporting', name: 'Reporting', description: 'Access various reports and dashboards' },
  { key: 'billing', name: 'Billing', description: 'Manage invoicing, payment processing, and subscription plans'},
  { key: 'support', name: 'Support', description: 'Provide customer assistance and issue resolution services'},
];

  nextStep() {
  this.saveCurrentStep();
  if (this.stepIndex === 2) {
    if (this.formData.modules.length > 0) {
      this.router.navigate([`/requirements/wizard/module-${this.formData.modules[0]}`]);
      return;
    }
  }
    // In other cases, add steps normally
      if (this.stepIndex < 3) {
    this.stepIndex++;
    this.restoreStepData();
  }
  if (this.stepIndex === 3) {
    this.formData['moduleDetails'] = this.wizardDataService.wizardData.moduleDetails;
  }
}


  
  previousStep() {
    this.saveCurrentStep();
    if (this.stepIndex > 1) {
      this.stepIndex--;
      this.restoreStepData();
    }
  }

  isStepValid(): boolean {
    switch (this.stepIndex) {
    case 1:
      if (this.formData.tenant === '__new__') {
        return this.formData.newTenantName.trim().length > 0;
      }
      return this.formData.tenant !== '';

    case 2:
      return this.formData.modules.length > 0;
    default:
      return true;

    case 3:
      return this.formData.configNotes.trim().length >= 10;
  }
}

  onModuleChange(event: any) {
    const module = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      this.formData.modules.push(module);
    } else {
      const index = this.formData.modules.indexOf(module);
      if (index >= 0) {
        this.formData.modules.splice(index, 1);
      }
    }

     this.wizardDataService.setSelectedModules(this.formData.modules);
  }

  submitWizard() {
  this.formData['moduleDetails'] = this.wizardDataService.wizardData.moduleDetails;
  const entry = {
    tenant: this.wizardDataService.getData('tenant') || '',
    newTenantName: this.wizardDataService.getData('newTenantName') || '',
    contactName: this.wizardDataService.getData('contactName') || '',
    contactEmail: this.wizardDataService.getData('contactEmail') || '',
    contactPhone: this.wizardDataService.getData('contactPhone') || '',
    modules: this.wizardDataService.getSelectedModules() || [],
    configNotes: this.wizardDataService.getData('configNotes') || '',
    createdBy: this.wizardDataService.getData('createdBy') || '',
    moduleDetails: this.wizardDataService.wizardData.moduleDetails
  };
  this.wizardDataService.saveWizardEntry(entry);
  this.router.navigate(['/']);
  this.wizardDataService.resetData();
}

isCreatingNewTenant = false;

checkNewTenant() {
  this.isCreatingNewTenant = this.formData.tenant === '__new__';
}

saveCurrentStep() {
  this.wizardDataService.setData('step' + this.stepIndex, { ...this.formData });
  Object.keys(this.formData).forEach(key => {
    this.wizardDataService.setData(key, this.formData[key]);
  });
}

restoreStepData() {
  const saved = this.wizardDataService.getData('step' + this.stepIndex);
  if (saved) {
    this.formData = { ...this.formData, ...saved };
  }
}

getModuleNameByKey(key: string): string {
  const mod = this.availableModules.find(m => m.key === key);
  return mod ? mod.name : key;
}

onInputChange(field: string, value: any) {
  this.formData[field] = value;
  this.wizardDataService.setData(field, value);
}

ngOnInit() {
  this.restoreStepData();
  this.formData.tenant = this.wizardDataService.getData('tenant') || '';
  this.formData.newTenantName = this.wizardDataService.getData('newTenantName') || '';
  this.formData.contactName = this.wizardDataService.getData('contactName') || '';
  this.formData.contactEmail = this.wizardDataService.getData('contactEmail') || '';
  this.formData.contactPhone = this.wizardDataService.getData('contactPhone') || '';
  this.formData.modules = this.wizardDataService.getSelectedModules() || [];
  this.formData.configNotes = this.wizardDataService.getData('configNotes') || '';
  this.formData.createdBy = this.wizardDataService.getData('createdBy') || '';
  this.formData.moduleDetails = this.wizardDataService.wizardData.moduleDetails;
}

getSelectedModuleNames(): string {
  return (this.formData.modules || [])
    .map((m: string) => this.getModuleNameByKey(m))
    .join(', ');
}

}
