import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <h3>{{ title }}</h3>
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: block;
      border: 2px solid black;
    }
  `]
})
export class CardComponent {

  @Input() title = '';
}
