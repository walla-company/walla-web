import { Component } from '@angular/core';
import { AppSettings } from './app.settings';
import { Domain } from './models/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    let domains = AppSettings.getAllowedDomains();
    let curDomain = AppSettings.getCurrentDomain();
    if (!curDomain || !domains || !domains.length) {
        // hard coded for now
        AppSettings.setAllowedDomains([
            <Domain> { id: 'duke', full_name: 'Duke University', domain: 'duke.edu' },
            <Domain> { id: 'sandiego', full_name: 'University of San Diego', domain: 'sandiego.edu' }
        ]);
        AppSettings.setCurrentDomain('duke');
    }
  }
}
