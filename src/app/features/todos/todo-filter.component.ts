import { Component, EventEmitter, Input, Output } from '@angular/core';

export type TodoFilter = 'ALL' | 'ACTIVE' | 'COMPLETED';

@Component({
  selector: 'app-todo-filter',
  template: `
    <select [ngModel]="filter" (ngModelChange)="onModelChange($event)">
      <option value="ALL">All</option>
      <option value="ACTIVE">Active</option>
      <option value="COMPLETED">Completed</option>
    </select>
  `
})
export class TodoFilterComponent {

  @Input() filter: TodoFilter = 'ALL';
  @Output() filterChange = new EventEmitter<TodoFilter>();

  onModelChange(filter: TodoFilter) {
    this.filter = filter;
    this.filterChange.emit(filter);
  }
}
