import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    {{ count }}
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
