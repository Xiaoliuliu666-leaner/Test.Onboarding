import { Routes } from '@angular/router';
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
    },

    {
        path: 'requirements/wizard/module-user-management',
        loadComponent: () => import('./requirements-wizard/module-user-management.component').then(m => m.ModuleUserManagementComponent),
        title: 'User Management Details'
  },
];
