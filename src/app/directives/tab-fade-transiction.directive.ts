import { Directive, HostListener, ElementRef, NgZone } from '@angular/core';

declare var jQuery;

@Directive({
    selector: '[wlTabFadeTransiction]'
})
export class TabFadeTransictionDirective {
    private fading: boolean = false;
    constructor(private el: ElementRef,
                private zone: NgZone) {
    }

    @HostListener('click', ['$event']) click(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        const tabContainer = jQuery(event.srcElement).closest('.tab-container');
        const tabs: Element[] = tabContainer.find('ul.nav-tabs li').toArray();
        if (tabs.some(t => t.contains(<Node>event.target))) {
            const $ul = jQuery(tabs).closest('ul');
            if (this.fading) {
                return;
            }
            this.fading = true;
            const tabContent = tabContainer.find('div.tab-content');
            tabContent.stop().hide(0, () => {
                tabContent.fadeIn(1000, () => {
                    this.zone.run(() => {
                        this.fading = false;
                    });
                });
            });
        }
    }
}
