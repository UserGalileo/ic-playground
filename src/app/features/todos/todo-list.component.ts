import { Component, OnInit } from '@angular/core';
import { TodoFilter, TodoFilterComponent } from './todo-filter.component';
import { TodosService } from '../../api/todos.service';
import { TodoFormComponent } from './todo-form.component';
import { TodoItemsComponent } from './todo-items.component';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoFormComponent, TodoFilterComponent, TodoItemsComponent],
  template: `
    <app-todo-form
      (addTodo)="onAddTodo($event)"
    ></app-todo-form>
    <app-todo-filter
      [(filter)]="filter"
    ></app-todo-filter>
    <app-todo-items
      [todos]="todos"
      [filter]="filter"
      (removeTodo)="onRemoveTodo($event)"
      (toggleTodo)="onToggleTodo($event)"
    ></app-todo-items>
  `,
})
export class TodoListComponent implements OnInit {

  filter: TodoFilter = 'ALL';
  todos: Todo[] = [];

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todosService.getTodos().subscribe(todos => {
      this.todos = todos;
    })
  }

  onToggleTodo(id: string) {
    const todo = this.todos.find(t => t.id === id)!;
    this.todosService.updateTodo(
      id,
      { ...todo, completed: !todo.completed }
    ).subscribe(newTodo => {
      this.todos = this.todos.map(t => t.id === id ? newTodo : t);
    })
  }

  onRemoveTodo(id: string) {
    this.todosService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    });
  }

  onAddTodo(text: string) {
    this.todosService.addTodo({
      text,
      completed: false
    }).subscribe(newTodo => {
      this.todos = [...this.todos, newTodo];
    });
  }
}
