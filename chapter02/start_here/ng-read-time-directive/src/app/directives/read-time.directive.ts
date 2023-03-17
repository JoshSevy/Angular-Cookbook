import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

export interface IReadTimeConfig {
  wordsPerMinute: number;
}

@Directive({
  selector: '[readTime]',
})
export class ReadTimeDirective implements OnInit {
  @Input() configuration: IReadTimeConfig = {
    wordsPerMinute: 200,
  };
  @Output() readTimeCalculated = new EventEmitter<string>();
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const text = this.el.nativeElement.textContent;
    const time = this.calculateReadTime(text);
    const timeString: string = this.createTimeString(time);
    this.readTimeCalculated.emit(timeString);
    console.log(timeString);
  }

  private calculateReadTime(text: string) {
    const wordsCount = text.split(/\s+/g).length;
    const minutes: number = wordsCount / this.configuration.wordsPerMinute;
    return Math.ceil(minutes);
  }

  private createTimeString(timeInMinutes: number) {
    if (timeInMinutes === 1) {
      return `1 minute`;
    } else if (timeInMinutes < 1) {
      return `< 1 minute`;
    } else {
      return `${timeInMinutes} minutes`;
    }
  }
}
