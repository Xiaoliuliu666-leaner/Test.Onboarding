import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WizardDataService } from '../wizard-data.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.scss'],
  imports: [CommonModule]
})
export class EntryDetailsComponent implements OnInit {
  entry: any = null;
  index: number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wizardDataService: WizardDataService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idx = +(params.get('index') || -1);
      this.index = idx;
      const allEntries = this.wizardDataService.getAllEntries();
      this.entry = allEntries[idx] || null;
    });
  }

  getModuleKeys(modules: any): string[] {
    return Object.keys(modules || {});
  }

  getModuleName(key: string): string {
    // Can adjust the display name as needed
    const mapping: any = {
      'user-management': 'User Management',
      'billing': 'Billing',
      'reporting': 'Reporting',
      'support': 'Support',
      'workflows': 'Workflows',
      'integrations': 'Integrations'
    };
    return mapping[key] || key;
  }

  editEntry() {
    this.wizardDataService.setCurrentClient(this.entry);
    this.router.navigate(['/requirements/wizard']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
