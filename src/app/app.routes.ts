import { Routes } from '@angular/router';
import { RequirementsWizard } from './requirements-wizard/requirements-wizard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
         path: '',
         component: HomeComponent,
         title: 'Main Page'
    },    


    {
        path: 'requirements/wizard',
        loadComponent: () => import('./requirements-wizard/requirements-wizard').then(m => m.RequirementsWizard),
        title:'Requirements Wizard'
    }
];
