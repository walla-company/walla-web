import { Component, OnInit } from '@angular/core';

import { User, Domain } from '../../models/index';
import { UserService, DomainService, AlertService } from '../../services/index';
import { AppSettings } from '../../app.settings';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    users: User[] = [];
    user: User = new User();
    loading: boolean = false;
    constructor (private userService: UserService,
                 private domainService: DomainService,
                 private alertService: AlertService) {
        this.loadUsers();
    }

    ngOnInit() {
        this.domainService.getCurrentDomain().subscribe(() => {
           this.loadUsers();
        });
    }

    loadUsers() {
        this.loading = true;
        this.userService.getAll(AppSettings.getCurrentDomain()).then(users => {
            this.users = users;
            this.loading = false;
        }, () => {
            this.alertService.error('Could load users data.');
            this.loading = false;
        });
    }
}
