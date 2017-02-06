import { Component } from '@angular/core';
import { AuthService } from './services/index';
import { AppSettings } from './app.settings';
import { Domain } from './models/index';

@Component({
    moduleId: module.id,
    selector: 'wl-main-app',
    templateUrl: 'app.html'
})
export class AppComponent {
    constructor (private authService: AuthService) {
        // hard coded for now
        AppSettings.setAllowedDomains([
            <Domain> { id: 'duke', full_name: 'Duke University', domain: 'duke.edu' },
            <Domain> { id: 'sandiego', full_name: 'University of San Diego', domain: 'sandiego.edu' }
        ]);
        AppSettings.setCurrentDomain('duke');
    }
}
