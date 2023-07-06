import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from './todo-list.component';
import { TodoFilter } from './todo-filter.component';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight.directive';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

// Stateless
@Component({
  selector: 'app-todo-items',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      <li *ngFor="let todo of (filteredTodos$ | async); trackBy: trackByTodo">
        <span>{{ todo.text }}</span>
        <button (click)="toggleTodo.emit(todo.id)">{{ todo.completed }}</button>
        <button (click)="removeTodo.emit(todo.id)">Remove</button>
      </li>
    </ul>
  `,
})
export class TodoItemsComponent {

  // States
  todos$ = new BehaviorSubject<Todo[]>([]);
  filter$ = new BehaviorSubject<TodoFilter>('ALL');

  // Derived state
  filteredTodos$ = combineLatest([this.todos$, this.filter$]).pipe(
    map(([todos, filter]) => {
      if (filter === 'COMPLETED') return todos.filter(t => t.completed);
      if (filter === 'ACTIVE') return todos.filter(t => !t.completed);
      return todos;
    })
  )

  @Input() set todos(todos: Todo[]) {
    this.todos$.next(todos);
  }

  @Input() set filter(filter: TodoFilter) {
    this.filter$.next(filter);
  }

  @Output() toggleTodo = new EventEmitter<string>();
  @Output() removeTodo = new EventEmitter<string>();

  trackByTodo(i: number, todo: Todo) {
    return todo.id;
  }
}
