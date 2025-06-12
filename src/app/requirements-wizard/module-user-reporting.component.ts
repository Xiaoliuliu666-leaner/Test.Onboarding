import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WizardDataService } from '../wizard-data.service';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-module-user-reporting',
  templateUrl: './module-user-reporting.component.html',
  imports: [FormsModule],
  styleUrls: ['./module-user-reporting.component.scss']
})
export class ModuleUserReportingComponent {
  // Used to collect user input data
  detail = {
    reportTypes: 1,
    reportingNotes: ''
  };

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {}

  onNext() {
    // Save data to global service
    this.wizardDataService.setModuleDetail('reporting', this.detail);
    // Jump to the next checked module or notes
    const next = this.wizardDataService.getNextModule('reporting');
    if (next) {
      this.router.navigate(['/requirements/wizard/module-' + next]);
    } else {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 3 } });
    }
  }
}