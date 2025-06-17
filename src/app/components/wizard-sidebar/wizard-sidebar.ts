import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wizard-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wizard-sidebar.html',
  styleUrls: ['./wizard-sidebar.scss']
})

export class WizardSidebarComponent {
  @Input() activeMenu: string = '';
  @Input() integrationSteps: string[] = [];
  @Input() integrationStepIndex: number|null = null;
  @Output() integrationStepChange = new EventEmitter<number>();


  menuList = [
    { key: 'User Management', label: 'User Management' },
    { key: 'Billing', label: 'Billing' },
    { key: 'Reporting', label: 'Reporting' },
    { key: 'Support', label: 'Support' },
    { key: 'Workflows', label: 'Workflows'},
    { key: 'Integrations', label: 'Integrations' }
  ];

  integrationStepLabelMap: any = {
    winbeat: 'WinBEAT',
    insight: 'Insight',
    officetech: 'Officetech'
  };

  getIntegrationLabel(key: string) {
    return this.integrationStepLabelMap[key] || key;
  }
}
