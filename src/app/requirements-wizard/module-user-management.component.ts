import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WizardDataService } from '../wizard-data.service';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-module-user-management',
  templateUrl: './module-user-management.component.html',
  imports: [FormsModule],
  styleUrls: ['./module-user-management.component.scss']
})
export class ModuleUserManagementComponent {
  // Used to collect user input data
  detail = {
    adminCount: 1,
    notes: ''
  };

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {}

  onNext() {
    // Save data to global service
    this.wizardDataService.setModuleDetail('userManagement', this.detail);
    // Jump to the next checked module or notes
    const next = this.wizardDataService.getNextModule('user-management');
    if (next) {
      this.router.navigate(['/requirements-wizard/module-' + next]);
    } else {
      this.router.navigate(['/requirements-wizard/notes']);
    }
  }
}
