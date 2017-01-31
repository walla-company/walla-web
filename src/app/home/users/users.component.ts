import { Component } from '@angular/core';

import { User } from '../../models/index';
import { UserService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'wl-users',
    templateUrl: 'users.html'
})
export class UsersComponent {
    users: User[] = [];
    loading: boolean = false;

    constructor (private userService: UserService) {
        this.loading = true;
        userService.getAll().then((list => {
            this.users = list || [];
            this.loading = false;
        }).bind(this));
    }
}
