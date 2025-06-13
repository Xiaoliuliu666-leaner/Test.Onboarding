import { Component, OnInit } from '@angular/core';
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
export class ModuleUserReportingComponent implements OnInit {
  detail = {
    reportTypes: '',
    reportingNotes: '',
    reports: [{ name: '', description: '' }]
  };

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {}

  ngOnInit() {
    const saved = this.wizardDataService.getModuleDetail('reporting');
    if (saved) {
      this.detail = { ...this.detail, ...saved };
    }
  }

  addReport() {
    this.detail.reports.push({ name: '', description: '' });
  }
  removeReport(i: number) {
    this.detail.reports.splice(i, 1);
  }

  onNext() {
    this.wizardDataService.setModuleDetail('reporting', this.detail);
    const selected = this.wizardDataService.getSelectedModules();
    const idx = selected.indexOf('reporting');
    const next = idx >= 0 && idx < selected.length - 1 ? selected[idx + 1] : null;
    if (next) {
      this.router.navigate(['/requirements/wizard/module-' + next]);
    } else {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 3 } });
    }
  }
}
