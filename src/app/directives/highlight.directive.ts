import { Directive, ElementRef, HostListener, Input } from '@angular/core';

// Attribute Directive
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  @Input('appHighlight') bgColor = 'yellow';
  @Input('highlightTextColor') color = 'black';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.bgColor;
    this.el.nativeElement.style.color = this.color;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
    this.el.nativeElement.style.color = 'inherit';
  }

  constructor(private el: ElementRef) {}
}
