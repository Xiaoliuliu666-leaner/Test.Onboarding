import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WizardDataService } from '../wizard-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WizardHeadbarComponent } from '../components/wizard-headbar/wizard-headbar';
import { WizardSidebarComponent } from '../components/wizard-sidebar/wizard-sidebar';
import { WizardContentOutlineComponent } from '../components/wizard-content-outline/wizard-content-outline';


@Component({
  standalone: true,
  selector: 'app-module-user-management',
  templateUrl: './module-user-management.component.html',
  imports: [FormsModule, CommonModule, WizardHeadbarComponent, WizardSidebarComponent, WizardContentOutlineComponent,],
  styleUrls: ['./module-user-management.component.scss']
})
export class ModuleUserManagementComponent {
  roles = ['Organisation Admins', 'Brokers'];
  usersByRole: { [role: string]: Array<{ Name: string, Email: string, Phone: string }> } = {};

  detail = {adminCount: 1, notes:''};

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {
    // 初始化每个角色的用户数组 | Initialize the users array for each role
    this.roles.forEach(role => {
      this.usersByRole[role] = [];
    });
  }

  onAddUser(role: string){
    this.usersByRole[role].push({ Name:'', Email:'', Phone:''});
  }

  onRemoveUser(role: string, idx:number){
    this.usersByRole[role].splice(idx, 1);
  }

  onNext() {
    this.wizardDataService.setModuleDetail('user-management',{ usersByRole: this.usersByRole, detail: this.detail});
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
