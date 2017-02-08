import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, DomainService } from '../../services/index';
import { Domain } from '../../models/index';
import { AppSettings } from '../../app.settings';

@Component({
    moduleId: module.id,
    selector: 'wl-navbar',
    templateUrl: 'navbar.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [
        'navbar.css'
    ]
})
export class NavbarComponent {
    @Input() brand: string;
    domain_id: string;
    domains: Domain[];

    constructor (private router: Router,
                 private authService: AuthService,
                 private domainService: DomainService) {
        this.domains = AppSettings.getAllowedDomains();
        this.domain_id = AppSettings.getCurrentDomain();
    }

    logOut() {
        this.authService.logOut();
        this.router.navigate(['login']);
    }

    changeDomain() {
        this.domainService.setCurrentDomain(this.domain_id);
    }
}
