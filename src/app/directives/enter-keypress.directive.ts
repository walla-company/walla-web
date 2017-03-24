import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appEnterKeypress]'
})
export class EnterKeypressDirective {
  @Output() appEnterKeypress: EventEmitter<any> = new EventEmitter();

  @HostListener('keydown', ['$event']) keydown(event: KeyboardEvent) {
      if (event.keyCode === 13) {
          this.appEnterKeypress.emit();
      }
  }
}
