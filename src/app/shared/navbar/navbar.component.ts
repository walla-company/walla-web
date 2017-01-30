import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'wl-navbar',
    templateUrl: 'navbar.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
    @Input() brand: string;

    constructor (private router: Router, private authService: AuthService) {
    }

    logOut() {
        this.authService.logOut();
        this.router.navigate(['login']);
    }
}
