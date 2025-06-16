import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wizard-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wizard-sidebar.html',
  styleUrls: ['./wizard-sidebar.scss']
})

export class WizardSidebarComponent {
  @Input() activeMenu: string = '';
  menuList = [
    { key: 'User Management', label: 'User Management' },
    { key: 'Billing', label: 'Billing' },
    { key: 'Reporting', label: 'Reporting' },
    { key: 'Support', label: 'Support' }
  ];
}
