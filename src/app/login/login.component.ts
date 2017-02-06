import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AlertService } from '../services/index';
import { User, Domain } from '../models/index';
import { AppSettings } from '../app.settings';

@Component({
    moduleId: module.id,
    selector: 'wl-login',
    templateUrl: 'login.html',
    styleUrls: [
        'login.css'
    ]
})
export class LoginComponent implements OnInit {
    model: User = new User();
    private redirectUrl: string;
    private loading: boolean;

    constructor (private router: Router,
                 private authService: AuthService,
                 private alertService: AlertService) {
        this.router.navigate(['home']);
        // if (authService.isLoggedIn()) {
        //     this.router.navigate(['home']);
        // }
    }

    ngOnInit() {
        // this.authService.logOut();
        // this.redirectUrl = this.authService.redirectUrl || 'home';
        this.authService.redirectUrl = null;
    }

    login () {
        this.authService.login(this.model)
            .then(res => {
                // hard coded for now
                AppSettings.setAllowedDomains([
                    <Domain> { id: 'duke', full_name: 'Duke University', domain: 'duke.edu' },
                    <Domain> { id: 'sandiego', full_name: 'University of San Diego', domain: 'sandiego.edu' }
                ]);
                AppSettings.setCurrentDomain('duke');
                this.router.navigate([this.redirectUrl]);
            }, err => this.alertService.error(err));
    }
}
