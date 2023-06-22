import { Component } from '@angular/core';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  template: `
    <form (ngSubmit)="onSubmit()">
      <input type="text" name="todo" [(ngModel)]="control">
      <button>Add</button>
    </form>

    <ul>
      <li *ngFor="let todo of todos">
        {{ todo.text }}
        <button (click)="toggleTodo(todo.id)">{{ todo.completed }}</button>
        <button (click)="removeTodo(todo.id)">Remove</button>
      </li>
    </ul>
  `
})
export class TodoListComponent {

  control = '';

  todos: Todo[] = [
    { id: '1', text: 'fare la spesa', completed: true },
    { id: '2', text: 'cucinare', completed: false },
  ];

  toggleTodo(id: string) {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
  }

  removeTodo(id: string) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  onSubmit() {
    this.todos = [ ...this.todos, {
      id: '' + Math.random(),
      text: this.control,
      completed: false
    }];
    this.control = '';
  }
}
