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
  @Input() menuList: Array<{ label: string, key: string, isStep?: boolean, isSub?: boolean }> = [];
  @Input() activeMenu: string = '';
  @Input() integrationSteps: string[] = [];
  @Input() integrationStepIndex: number | null = null;

  @Output() menuClick = new EventEmitter<string>();
  @Output() integrationStepChange = new EventEmitter<number>();


  onMenuClick(key: string) {
    this.menuClick.emit(key);
  };

  integrationStepLabelMap: any = {
    winbeat: 'WinBEAT',
    insight: 'Insight',
    officetech: 'Officetech'
  };

  getIntegrationLabel(key: string) {
    return this.integrationStepLabelMap[key] || key;
  }
}
