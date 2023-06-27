import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  template: `
    <form (ngSubmit)="onSubmit()">
      <input type="text" name="todo" [(ngModel)]="control">
      <button>Add</button>
    </form>
  `
})
export class TodoFormComponent {
  control = '';

  @Output() addTodo = new EventEmitter<string>();

  onSubmit() {
    this.addTodo.emit(this.control);
    this.control = '';
  }
}
