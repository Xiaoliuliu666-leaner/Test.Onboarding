import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WizardDataService } from '../wizard-data.service';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-module-user-support',
  templateUrl: './module-user-support.component.html',
  imports: [FormsModule],
  styleUrls: ['./module-user-support.component.scss']
})
export class ModuleUserSupportComponent {
  // Used to collect user input data
  detail = {
    supportLevel: 1,
    supportNotes: ''
  };

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {}

  onNext() {
    // Save data to global service
    this.wizardDataService.setModuleDetail('support', this.detail);
    // Jump to the next checked module or notes
    const next = this.wizardDataService.getNextModule('support');
    if (next) {
      this.router.navigate(['/requirements/wizard/module-' + next]);
    } else {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 3 } });
    }
  }
}