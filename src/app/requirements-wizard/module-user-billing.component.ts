import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WizardDataService } from '../wizard-data.service';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-module-user-billing',
  templateUrl: './module-user-billing.component.html',
  imports: [FormsModule],
  styleUrls: ['./module-user-billing.component.scss']
})
export class ModuleUserBillingComponent {
  // Used to collect user input data
  detail = {
    billingAccount: 1,
    billingNotes: ''
  };

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {}

  onNext() {
    // Save data to global service
    this.wizardDataService.setModuleDetail('billing', this.detail);
    // Jump to the next checked module or notes
    const next = this.wizardDataService.getNextModule('billing');
    if (next) {
      this.router.navigate(['/requirements/wizard/module-' + next]);
    } else {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 3 } });
    }
  }
}