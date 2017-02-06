import { Component } from '@angular/core';

import { User, Domain } from '../../models/index';
import { UserService, DomainService } from '../../services/index';
import { AppSettings } from '../../app.settings';

@Component({
    moduleId: module.id,
    selector: 'wl-users',
    templateUrl: 'users.html'
})
export class UsersComponent {
    users: User[] = [];
    domains: Domain[];
    loading: boolean = false;
    school_id: string;
    constructor (private userService: UserService,
                 private domainService: DomainService) {
        this.domains = AppSettings.getAllowedDomains();
        this.school_id = AppSettings.getCurrentDomain();
        this.loadUsers();
    }

    changeDomain() {
        AppSettings.setCurrentDomain(this.school_id);
        this.loadUsers();
    }

    loadUsers() {
        this.loading = true;
        this.userService.getAll(this.school_id).then(users => {
            let tmpUsers: User[] = [];
            for (let id in users) {
                if (users.hasOwnProperty(id) && users[id].interests && users[id].interests.length) {
                    tmpUsers.push(<User> users[id]);
                }
            }
            this.users = tmpUsers;
            this.loading = false;
        });
    }
}
