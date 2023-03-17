import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective implements OnChanges {
  @Input() highlightText: string;
  @Input('highlight') highlightColor: string = 'yellow';
  originalHTML = '';

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.highlightText.firstChange) {
      this.originalHTML = this.el.nativeElement.innerHTML;
      return;
    }
    const { currentValue, previousValue } = changes.highlightText;
    if (currentValue) {
      const regExp = new RegExp(`(${currentValue})`, 'gi');
      this.el.nativeElement.innerHTML = this.originalHTML.replace(
        regExp,
        `<span style="background-color: ${this.highlightColor}">\$1</span>`
      );
    } else {
      this.el.nativeElement.innerHTML = this.originalHTML;
    }
    console.log('currentValue', currentValue);
    console.log('previousValue', previousValue);
  }
}
