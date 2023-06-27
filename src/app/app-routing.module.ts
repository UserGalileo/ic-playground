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
    loadComponent: () => import('./features/counter/counter.component').then(m => m.CounterComponent)
  },
  {
    path: 'todos',
    loadComponent: () => import('./features/todos/todo-list.component').then(m => m.TodoListComponent)
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
