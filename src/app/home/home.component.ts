import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WizardDataService } from '../wizard-data.service'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  wizardEntries: any[] = [];

  constructor(private wizardDataService: WizardDataService) {}

  ngOnInit(): void {
    this.wizardEntries = this.wizardDataService.getAllEntries(); 
    console.log('Retrieved Wizard Entries:', this.wizardEntries);
  }
}

