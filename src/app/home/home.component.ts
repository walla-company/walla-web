import { Component } from '@angular/core';

import { CONSTANTS } from '../shared';

@Component({
    moduleId: module.id,
    selector: 'wl-home',
    templateUrl: 'home.html',
    styleUrls: [
        'home.css'
    ]
})
export class HomeComponent {
    public appBrand: string;

    constructor() {
        this.appBrand = CONSTANTS.MAIN.APP.BRAND;
    }
}
