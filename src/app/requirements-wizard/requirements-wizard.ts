import { Component } from '@angular/core';

@Component({
  selector: 'app-requirements-wizard',
  imports: [],
  templateUrl: './requirements-wizard.html',
  styleUrl: './requirements-wizard.css'
})
export class RequirementsWizard {
  step = 1;

  client = {
    name: '',
    tenantID: '',
    services: [] as string[]
  };

   availableServices = [
    { name: 'Active Directory Certificate Services', selected: false },
    { name: 'DNS Server', selected: false },
    { name: 'DHCP Server', selected: false },
    { name: 'File Services', selected: false }
  ];

  nextStep() {
    if (this.step === 2) {
      this.client.services = this.availableServices
        .filter(s => s.selected)
        .map(s => s.name);
    }
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  submit() {
    console.log('Final client config:', this.client);
  }


}
