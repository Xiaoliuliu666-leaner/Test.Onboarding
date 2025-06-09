import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-requirements-wizard',
  imports: [FormsModule,CommonModule],
  templateUrl: './requirements-wizard.html',
  styleUrl: './requirements-wizard.css'
})

export class RequirementsWizard {
  stepIndex = 1;

  formData: {
  tenant: string;
  newTenantName: string;
  modules: string[];
  configNotes: string;
} = {
  tenant: '',
  newTenantName: '',
  modules: [],
  configNotes: ''
};

   tenants = ['Tenant A', 'Tenant B', 'Tenant C'];
  availableModules = ['User Management', 'Reporting', 'Billing', 'Support'];

  nextStep() {
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
    console.log('Wizard Data:', this.formData);
    alert('Wizard submitted! Check console for data.');
  }

isCreatingNewTenant = false;

checkNewTenant() {
  this.isCreatingNewTenant = this.formData.tenant === '__new__';
}

  
}
