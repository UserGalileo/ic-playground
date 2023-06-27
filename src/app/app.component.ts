import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <a routerLink="/">counter</a> |
    <a routerLink="/todos">todos</a>

    <hr>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
