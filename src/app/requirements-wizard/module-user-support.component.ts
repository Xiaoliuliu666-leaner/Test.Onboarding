import { Component, OnInit } from '@angular/core';
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
export class ModuleUserSupportComponent implements OnInit {
  detail = {
    supportLevel:'',
    supportNotes:'',
    levelRequired: 1
  };

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {}

  ngOnInit() {
    const saved = this.wizardDataService.getModuleDetail('support');
    if (saved) {
      this.detail = { ...this.detail, ...saved };
    }
  }

  onNext() {
    this.wizardDataService.setModuleDetail('support', this.detail);
    const selected = this.wizardDataService.getSelectedModules();
    const idx = selected.indexOf('support');
    const next = idx >= 0 && idx < selected.length - 1 ? selected[idx + 1] : null;
    if (next) {
      this.router.navigate(['/requirements/wizard/module-' + next]);
    } else {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 3 } });
    }
  }
}
