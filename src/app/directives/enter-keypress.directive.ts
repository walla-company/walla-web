import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[wlEnterKeypress]'
})
export class EnterKeypressDirective {
    @Output() wlEnterKeypress: EventEmitter<any> = new EventEmitter();

    @HostListener('keydown', ['$event']) keydown(event: KeyboardEvent) {
        if (event.keyCode === 13) {
            this.wlEnterKeypress.emit();
        }
    }
}
