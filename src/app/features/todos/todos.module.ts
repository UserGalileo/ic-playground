import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { TodoItemsComponent } from './todo-items.component';
import { TodoFormComponent } from './todo-form.component';
import { TodoFilterComponent } from './todo-filter.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TodoListComponent
      },
    ]),
    SharedModule
  ],
  declarations: [
    TodoListComponent,
    TodoItemsComponent,
    TodoFormComponent,
    TodoFilterComponent
  ]
})
export class TodosModule {}
