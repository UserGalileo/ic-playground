import 'zone.js/dist/zone';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';

const routes: Routes = [
  {
    path: 'invoices',
    loadChildren: () => import('./app/features/invoices/invoices.routes')
  },
  {
    path: '**',
    redirectTo: '/invoices'
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(
      routes,
      withComponentInputBinding()
    )
  ]
});


