import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WizardDataService } from '../wizard-data.service';
import { FormsModule } from '@angular/forms';
import { WizardHeadbarComponent } from '../components/wizard-headbar/wizard-headbar';
import { WizardSidebarComponent } from '../components/wizard-sidebar/wizard-sidebar';
import { WizardContentOutlineComponent } from '../components/wizard-content-outline/wizard-content-outline';



@Component({
  standalone: true,
  selector: 'app-module-user-billing',
  templateUrl: './module-user-billing.component.html',
  imports: [FormsModule, WizardHeadbarComponent, WizardSidebarComponent, WizardContentOutlineComponent,],
  styleUrls: ['./module-user-billing.component.scss']
})

export class ModuleUserBillingComponent {
  detail = {
    billingAccount: '',
    billingNotes: '',
    billingCycles: [{ cycleName: '', amount: 0 }],
    paymentMethods: [{ methodName: '', details: '' }]
  };

  constructor(
    private router: Router,
    private wizardDataService: WizardDataService
  ) {}

  ngOnInit() {
    const saved = this.wizardDataService.getModuleDetail('billing');
    if (saved) {
      this.detail = { ...this.detail, ...saved };
    }
  }

  addBillingCycle() {
    this.detail.billingCycles.push({ cycleName: '', amount: 0 });
  }
  removeBillingCycle(i: number) {
    this.detail.billingCycles.splice(i, 1);
  }
  addPaymentMethod() {
    this.detail.paymentMethods.push({ methodName: '', details: '' });
  }
  removePaymentMethod(i: number) {
    this.detail.paymentMethods.splice(i, 1);
  }

  onNext() {
    this.wizardDataService.setModuleDetail('billing', this.detail);
    const selected = this.wizardDataService.getSelectedModules();
    const idx = selected.indexOf('billing');
    const next = idx >= 0 && idx < selected.length - 1 ? selected[idx + 1] : null;
    if (next) {
      this.router.navigate(['/requirements/wizard/module-' + next]);
    } else {
      this.router.navigate(['/requirements/wizard'], { queryParams: { step: 3 } });
    }
  }
}