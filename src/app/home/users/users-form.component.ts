import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../models/index';
import { UserService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'wl-users-form',
    templateUrl: 'users-form.html'
})
export class UsersFormComponent implements OnInit, OnDestroy {
    user: User;
    private sub: any;

    constructor(private route: ActivatedRoute,
                private userService: UserService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            this.userService.getById(id).then(user => this.user = user);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
