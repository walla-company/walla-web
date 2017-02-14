import { Component, OnInit } from '@angular/core';

import { User, Domain } from '../../models/index';
import { UserService, DomainService, AlertService } from '../../services/index';
import { AppSettings } from '../../app.settings';

@Component({
    moduleId: module.id,
    selector: 'wl-users',
    templateUrl: 'users.html'
})
export class UsersComponent implements OnInit {
    users: User[] = [];
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
            let tmpUsers: User[] = [];
            for (let id in users) {
                if (users.hasOwnProperty(id)) {
                    tmpUsers.push(<User> users[id]);
                }
            }
            this.users = tmpUsers;
            this.loading = false;
        }, () => {
            this.alertService.error('Could load users data.');
            this.loading = false;
        });
    }
}
