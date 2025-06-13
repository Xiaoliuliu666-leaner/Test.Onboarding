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
  detail = {adminCount: 1, notes:''};
  users = [{ Name:'', Email:'', Phone:'', Role:''}];

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {}

  onAddUser(){
    this.users.push({ Name:'', Email:'', Phone:'', Role:'' });
  }

  onRemoveUser(idx:number){
    this.users.splice(idx, 1);
  }

  onNext() {
    this.wizardDataService.setModuleDetail('user-management',{ users: this.users});
    const selected = this.wizardDataService.getSelectedModules();
      const idx = selected.indexOf('user-management');
      const next = idx >= 0 && idx < selected.length - 1 ? selected[idx + 1] : null;
      if (next) {
        this.router.navigate(['/requirements/wizard/module-' + next]);
      } else {
        this.router.navigate(['/requirements/wizard'], { queryParams: { step: 3 } });
      }
    }
  }
