import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WizardDataService } from '../wizard-data.service'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  wizardEntries: any[] = [];

  availableModules = [
  { key: 'user-management', name: 'User Management', description: 'Manage users and roles' },
  { key: 'reporting', name: 'Reporting', description: 'Access various reports and dashboards' },
  { key: 'billing', name: 'Billing', description: 'Manage invoicing, payment processing, and subscription plans'},
  { key: 'support', name: 'Support', description: 'Provide customer assistance and issue resolution services'},
];

getModuleKeys(modules: any): string[] {
  return Object.keys(modules || {});
}

getModuleNameByKey(key: string): string {
  const mod = this.availableModules.find(m => m.key === key);
  return mod ? mod.name : key;
}

  constructor(private wizardDataService: WizardDataService) {}

  ngOnInit(): void {
    this.wizardEntries = this.wizardDataService.getAllEntries(); 
    console.log('Retrieved Wizard Entries:', this.wizardEntries);
  }
}

