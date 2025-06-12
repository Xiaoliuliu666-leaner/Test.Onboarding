import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WizardDataService } from '../wizard-data.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-requirements-wizard',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './requirements-wizard.html',
  styleUrls: ['./requirements-wizard.scss']
})

export class RequirementsWizard {
  constructor(
    private wizardDataService: WizardDataService,
    private router: Router) {}
  stepIndex = 1;

  formData: {
  tenant: string;
  newTenantName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  modules: string[];
  configNotes: string;
  createdBy: string
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
    this.saveCurrentStep()
    if (this.stepIndex === 2) {
    // After Step 2 (module selection), jump to the first selected module details page面
    if (this.formData.modules.length > 0) {
      const firstModuleKey = this.formData.modules[0];
      this.router.navigate([`/requirements/wizard/module-${this.formData.modules[0]}`]);
      return; 
    }
  }
    // In other cases, add steps normally
    if (this.stepIndex < 3) {
      this.stepIndex++;
    }
  }

  previousStep() {
    if (this.stepIndex > 1) {
      this.stepIndex--;
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
  }

  submitWizard() {
  this.wizardDataService.saveWizardEntry(this.formData); 
  console.log(this.wizardDataService.getAllEntries());
  alert('Wizard submitted!');
  this.router.navigate(['/']);
  
 
}

isCreatingNewTenant = false;

checkNewTenant() {
  this.isCreatingNewTenant = this.formData.tenant === '__new__';
}

saveCurrentStep() {
  this.wizardDataService.setData('step${this.stepIndex}', 
    {...this.formData});
}

  
}
