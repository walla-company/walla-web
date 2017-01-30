import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AlertService } from '../services/index';
import { User } from '../models/index';

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
        if (authService.isLoggedIn()) {
            this.router.navigate(['home']);
        }
    }

    ngOnInit() {
        this.authService.logOut();
        this.redirectUrl = this.authService.redirectUrl || 'home';
        this.authService.redirectUrl = null;
    }

    login () {
        let self = this;
        self.authService.login(this.model)
            .then(res => self.router.navigate([this.redirectUrl]),
                       err => {
                           this.alertService.error(err);
                       });
    }
}
