import { Component, OnInit } from '@angular/core';
import { User, Domain } from "app/models";
import { Router } from "@angular/router";
import { AlertService, AuthService } from "app/services";
import { AppSettings } from "app/app.settings";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    model: User = new User();
    private redirectUrl: string;
    private loading: boolean;

    constructor (private router: Router,
                 private authService: AuthService,
                 private alertService: AlertService) {
    }

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            return this.router.navigate(['home/dashboard']);
        }
        this.authService.logOut();
        this.redirectUrl = this.authService.redirectUrl || 'home/dashboard';
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
