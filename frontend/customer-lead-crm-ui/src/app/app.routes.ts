import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent)
      },
      {
        path: 'lead-types',
        loadComponent: () => import('./features/lead-types/lead-types.component').then((m) => m.LeadTypesComponent)
      },
      {
        path: 'customer-leads',
        loadComponent: () => import('./features/customer-leads/customer-leads.component').then((m) => m.CustomerLeadsComponent)
      },
      {
        path: 'follow-ups',
        loadComponent: () => import('./features/follow-ups/follow-ups.component').then((m) => m.FollowUpsComponent)
      },
      {
        path: 'notes',
        loadComponent: () => import('./features/notes/notes.component').then((m) => m.NotesComponent)
      },
      {
        path: 'reminders',
        loadComponent: () => import('./features/reminders/reminders.component').then((m) => m.RemindersComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
