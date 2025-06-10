import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WizardDataService } from '../wizard-data.service'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   constructor(private wizardDataService: WizardDataService) {
    console.log('Retrieved Wizard Data:', this.wizardDataService.getWizardData());
  }
}
