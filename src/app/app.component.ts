import { Component } from '@angular/core';
import { AuthService } from './services/index';

@Component({
    moduleId: module.id,
    selector: 'wl-main-app',
    templateUrl: 'app.html'
})
export class AppComponent {
    constructor (private authService: AuthService) {
    }
}
