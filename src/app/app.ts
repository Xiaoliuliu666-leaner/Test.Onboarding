import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WizardHeadbarComponent } from './components/wizard-headbar/wizard-headbar';
import { WizardSidebarComponent } from './components/wizard-sidebar/wizard-sidebar';
import { WizardContentOutlineComponent } from './components/wizard-content-outline/wizard-content-outline';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'InsureTech.Onboarding';
}
