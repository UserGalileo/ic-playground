import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/counter'
  },
  {
    path: 'counter',
    loadChildren: () => import('./features/counter/counter.module').then(m => m.CounterModule)
  },
  {
    path: 'todos',
    loadChildren: () => import('./features/todos/todos.module').then(m => m.TodosModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
