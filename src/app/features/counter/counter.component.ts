import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [HighlightDirective],
  template: `
    <span appHighlight="yellow">{{ count }}</span>
    <button (click)="inc()">+</button>
    <button (click)="dec()">-</button>
  `,
})
export class CounterComponent {

  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();

  @Input() count = 0;

  inc() {
    this.count++;
    this.increment.emit();
  }

  dec() {
    this.count--;
    this.decrement.emit();
  }
}
