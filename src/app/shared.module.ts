import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToUppercasePipe } from './pipes/to-uppercase.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { UnlessDirective } from './directives/unless.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ToUppercasePipe,
    HighlightDirective,
    UnlessDirective
  ],
  exports: [
    ToUppercasePipe,
    HighlightDirective,
    UnlessDirective
  ]
})
export class SharedModule {}
