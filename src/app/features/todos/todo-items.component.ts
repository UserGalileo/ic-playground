import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from './todo-list.component';
import { TodoFilter } from './todo-filter.component';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight.directive';

// Stateless
@Component({
  selector: 'app-todo-items',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  template: `
    <ul>
      <li *ngFor="let todo of filteredTodos; trackBy: trackByTodo">
        <span appHighlight="yellow">{{ todo.text }}</span>
        <button (click)="toggleTodo.emit(todo.id)">{{ todo.completed }}</button>
        <button (click)="removeTodo.emit(todo.id)">Remove</button>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class TodoItemsComponent {
  @Input() todos: Todo[] = [];
  @Input() filter: TodoFilter = 'ALL';
  @Output() toggleTodo = new EventEmitter<string>();
  @Output() removeTodo = new EventEmitter<string>();

  // Derived state
  get filteredTodos() {
    if (this.filter === 'COMPLETED') return this.todos.filter(t => t.completed);
    if (this.filter === 'ACTIVE') return this.todos.filter(t => !t.completed);
    return this.todos;
  }

  trackByTodo(i: number, todo: Todo) {
    return todo.id;
  }
}
