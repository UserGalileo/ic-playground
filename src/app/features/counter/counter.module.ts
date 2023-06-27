import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CounterComponent
      }
    ]),
    SharedModule
  ],
  declarations: [
    CounterComponent,
  ]
})
export class CounterModule {}
