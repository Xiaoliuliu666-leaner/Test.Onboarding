import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WizardDataService } from '../wizard-data.service'; 
import { Router } from '@angular/router';
import { PlusIcon  } from '../icons/plus-icon/plus-icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, PlusIcon, FormsModule ],
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

  // summaryEntry 控制弹窗 Control pop-up windows
  summaryEntry: any = null;

  constructor(private wizardDataService: WizardDataService, private router: Router ) {}

  ngOnInit(): void {
    this.wizardEntries = this.wizardDataService.getAllEntries(); 
    console.log('Retrieved Wizard Entries:', this.wizardEntries);
  }

  // Click on the table row to pop up summary
  viewSummary(entry: any) {
    this.summaryEntry = entry;
  }

  // Close summary
  closeSummary() {
    this.summaryEntry = null;
  }

  // Jump to wizard and fill in data
  editEntry(entry: any) {
    this.wizardDataService.setCurrentClient(entry);
    this.router.navigate(['/requirements/wizard']);
  }

  viewDetails(idx: number) {
  this.router.navigate(['/entry-details', idx]);
  }

  searchText: string = '';

  get filteredEntries() {
    if (!this.searchText.trim()) return this.wizardEntries;
    const val = this.searchText.trim().toLowerCase();
    return this.wizardEntries.filter(entry =>
      (entry.tenant?.tenant || '').toLowerCase().includes(val) ||
      (entry.tenant?.newTenantName || '').toLowerCase().includes(val) ||
      (entry.tenant?.contactName || '').toLowerCase().includes(val) ||
      (entry.tenant?.contactEmail || '').toLowerCase().includes(val) ||
      (entry.tenant?.contactPhone || '').toLowerCase().includes(val) ||
      (entry.tenant?.createdBy || '').toLowerCase().includes(val) ||
      (entry.tenant?.configNotes || '').toLowerCase().includes(val)
    );
  }
}