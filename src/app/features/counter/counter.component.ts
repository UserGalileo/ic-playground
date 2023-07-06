import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../../components/card.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CardComponent],
  template: `
    <span>{{ count }}</span>
    <button (click)="inc()">+</button>
    <button (click)="dec()">-</button>

    <br>
    <app-card title="Lorem ipsum"></app-card>
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
