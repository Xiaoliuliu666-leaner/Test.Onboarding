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

    {
        path: 'requirements/wizard/module-billing',
        loadComponent: () => import('./requirements-wizard/module-user-billing.component').then(m => m.ModuleUserBillingComponent),
        title: 'Billing Details'
    },
    {
        path: 'requirements/wizard/module-reporting',
        loadComponent: () => import('./requirements-wizard/module-user-reporting.component').then(m => m.ModuleUserReportingComponent),
        title: 'Reporting Details'
    },

    {
        path: 'requirements/wizard/module-support',
        loadComponent: () => import('./requirements-wizard/module-user-support.component').then(m => m.ModuleUserSupportComponent),
        title: 'Support Details'
    },

    {
        path: 'requirements/wizard/module-workflows',
        loadComponent: () => import('./requirements-wizard/module-user-workflows.component').then(m => m.ModuleUserWorkflowsComponent),
        title: 'Workflows Requirements'
    },

    {
        path: 'requirements/wizard/module-broking-platform-integration',
        loadComponent: () => import('./requirements-wizard/module-broking-platform-integration.component').then(m => m.ModuleBrokingPlatformIntegrationComponent),
        title: 'Broking Platform Integration Details'
    }
];
