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
  { label: 'Step 1: Tenant', key: 'Tenant', isStep: true },
  { label: 'Tenant A', key: 'TenantA', isSub: true },
  { label: 'Step 2: Modules', key: 'Modules', isStep: true },
  { label: 'Workflows', key: 'Workflows', isSub: true },
  { label: 'Integrations', key: 'Integrations', isStep: true },
  { label: 'Step 3: Notes', key: 'Notes', isStep: true }
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
